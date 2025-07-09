import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as pollRushIdlFactory } from '../../../src/declarations/pollrush_backend/pollrush_backend.did';
import { idlFactory as ppsTokenIdlFactory } from '../../../backend/pps_token/src/pps_token.did';

interface WalletContextType {
  isConnected: boolean;
  principal: string | null;
  accountId: string | null;
  walletType: 'ii' | 'plug' | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  getTokens: () => Promise<Token[]>;
}

interface Token {
  symbol: string;
  address: string;
  balance: number;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<'ii' | 'plug' | null>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      
      const isLoggedIn = await client.isAuthenticated();
      if (isLoggedIn) {
        const identity = client.getIdentity();
        const agent = new HttpAgent({ identity });
        const principal = await agent.getPrincipal();
        setPrincipal(principal.toString());
        setAccountId(principal.toString());
        setWalletType('ii');
        setIsConnected(true);
      }
    };

    initAuth();
  }, []);

  const connectII = async () => {
    if (!authClient) return;

    await new Promise((resolve) => {
      authClient.login({
        identityProvider: import.meta.env.VITE_II_URL || 'https://identity.ic0.app',
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          const agent = new HttpAgent({ identity });
          const principal = await agent.getPrincipal();
          setPrincipal(principal.toString());
          setAccountId(principal.toString());
          setWalletType('ii');
          setIsConnected(true);
          resolve(true);
        },
        onError: () => {
          resolve(false);
        },
      });
    });
  };

  const connectPlug = async () => {
    if (typeof window.ic?.plug === 'undefined') {
      window.open('https://plugwallet.ooo/', '_blank');
      return;
    }

    try {
      const connected = await window.ic.plug.requestConnect();
      if (connected) {
        const principal = await window.ic.plug.getPrincipal();
        const accountId = await window.ic.plug.getAccountId();
        setPrincipal(principal.toString());
        setAccountId(accountId);
        setWalletType('plug');
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect to Plug wallet:', error);
    }
  };

  const connect = async () => {
    // This will be handled by the WalletSelectDialog
    return;
  };

  const disconnect = () => {
    if (walletType === 'ii' && authClient) {
      authClient.logout();
    } else if (walletType === 'plug') {
      window.ic?.plug?.disconnect();
    }
    setPrincipal(null);
    setAccountId(null);
    setWalletType(null);
    setIsConnected(false);
  };

  const getTokens = async (): Promise<Token[]> => {
    if (!principal) {
      throw new Error('Wallet not connected');
    }

    try {
      let agent: HttpAgent;
      if (walletType === 'ii' && authClient) {
        const identity = authClient.getIdentity();
        agent = new HttpAgent({ identity });
      } else if (walletType === 'plug') {
        agent = await window.ic.plug.createAgent();
      } else {
        throw new Error('No wallet connected');
      }

      if (import.meta.env.DFX_NETWORK === 'local') {
        agent.fetchRootKey();
      }

      // Get PPS token balance
      const ppsTokenCanisterId = import.meta.env.VITE_PPS_TOKEN_CANISTER_ID;
      if (!ppsTokenCanisterId) {
        throw new Error('PPS token canister ID not configured');
      }

      const ppsTokenActor = Actor.createActor(ppsTokenIdlFactory, {
        agent,
        canisterId: ppsTokenCanisterId,
      });

      const ppsBalance = await ppsTokenActor.icrc1_balance_of({
        owner: principal,
        subaccount: [],
      });

      // Get other tokens from the poll rush canister
      const pollRushCanisterId = import.meta.env.VITE_POLLRUSH_CANISTER_ID;
      if (!pollRushCanisterId) {
        throw new Error('Poll rush canister ID not configured');
      }

      const pollRushActor = Actor.createActor(pollRushIdlFactory, {
        agent,
        canisterId: pollRushCanisterId,
      });

      const otherTokens = await pollRushActor.get_user_tokens(principal) as Token[];

      // Combine PPS token with other tokens
      return [
        {
          symbol: 'PPS',
          address: ppsTokenCanisterId,
          balance: Number(ppsBalance) / 1e8, // Convert from e8s to decimal
        },
        ...otherTokens.map((token: Token) => ({
          symbol: token.symbol,
          address: token.address,
          balance: Number(token.balance) / 1e8,
        })),
      ];
    } catch (error) {
      console.error('Failed to get tokens:', error);
      throw error;
    }
  };

  return (
    <WalletContext.Provider value={{ isConnected, principal, accountId, walletType, connect, disconnect, getTokens }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 