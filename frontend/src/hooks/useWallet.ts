import { useState, useEffect } from 'react';

interface WalletState {
  isConnected: boolean;
  principal: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWallet = (): WalletState => {
  const [isConnected, setIsConnected] = useState(false);
  const [principal, setPrincipal] = useState<string | null>(null);

  const connect = async () => {
    try {
      // TODO: Implement wallet connection
      setIsConnected(true);
      setPrincipal('dummy-principal');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setPrincipal(null);
  };

  useEffect(() => {
    // TODO: Check if wallet is already connected
  }, []);

  return {
    isConnected,
    principal,
    connect,
    disconnect,
  };
}; 