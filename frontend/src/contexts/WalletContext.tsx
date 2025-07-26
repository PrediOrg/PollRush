import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
// 移除所有后端 canister 导入
// import { idlFactory as pollRushIdlFactory } from '../declarations/pollrush_backend/pollrush_backend.did';

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

  // 临时的 mock 数据，用于前端展示
  const getTokens = async (): Promise<Token[]> => {
    if (!principal) {
      throw new Error('Wallet not connected');
    }

    // 返回模拟数据，用于前端展示
    return [
      {
        symbol: 'ICP',
        address: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
        balance: 10.5,
      },
      {
        symbol: 'PPS',
        address: 'mock-token-canister-id',
        balance: 1000.0,
      },
    ];
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