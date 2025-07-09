import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useWallet } from '../contexts/WalletContext';

interface PollSortProps {
  onSortChange: (sortBy: 'newest' | 'oldest' | 'popular') => void;
}

const PollSort: React.FC<PollSortProps> = ({ onSortChange }) => {
  const { principal } = useWallet();

  const handleSortChange = (event: SelectChangeEvent) => {
    if (principal) {
      onSortChange(event.target.value as 'newest' | 'oldest' | 'popular');
    }
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select
          label="Sort By"
          onChange={handleSortChange}
          disabled={!principal}
        >
          <MenuItem value="newest">Newest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
          <MenuItem value="popular">Most Popular</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PollSort; 