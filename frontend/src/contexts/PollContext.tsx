import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from './WalletContext';
import type { Poll } from '../types';

interface PollContextType {
  polls: Poll[];
  loading: boolean;
  error: string | null;
  refreshPolls: () => Promise<void>;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

export const PollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { principal } = useWallet();

  const refreshPolls = async () => {
    try {
      setLoading(true);
      // Implement poll fetching logic here
      setPolls([]);
      setError(null);
    } catch (err) {
      setError('Failed to fetch polls');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (principal) {
      refreshPolls();
    }
  }, [principal]);

  return (
    <PollContext.Provider value={{ polls, loading, error, refreshPolls }}>
      {children}
    </PollContext.Provider>
  );
};

export const usePoll = () => {
  const context = useContext(PollContext);
  if (context === undefined) {
    throw new Error('usePoll must be used within a PollProvider');
  }
  return context;
}; 