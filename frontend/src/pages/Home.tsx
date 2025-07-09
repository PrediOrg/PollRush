import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useWallet } from '../contexts/WalletContext';

interface Poll {
  id: string;
  title: string;
  description: string;
  options: string[];
  votes: number[];
  endTime: number;
  creator: string;
}

const Home: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [sortBy, setSortBy] = useState<'time' | 'popularity'>('time');
  const { principal } = useWallet();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Fetch polls from the canister
    // This is a placeholder - implement actual canister call
    const fetchPolls = async () => {
      // const response = await pollCanister.get_polls(sortBy);
      // setPolls(response);
    };
    
    fetchPolls();
  }, [sortBy]);

  const handleVote = async (pollId: string) => {
    // Implementation
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Main content */}
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        {/* Add your main content here */}
      </Box>
    </Box>
  );
};

export default Home; 