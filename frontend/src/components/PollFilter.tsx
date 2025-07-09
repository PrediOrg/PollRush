import React from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';
import { useWallet } from '../contexts/WalletContext';

interface PollFilterProps {
  onFilterChange: (filters: {
    search?: string;
    status?: 'active' | 'ended';
    sortBy?: 'newest' | 'popular' | 'ending_soon';
  }) => void;
}

const PollFilter: React.FC<PollFilterProps> = ({ onFilterChange }) => {
  const { principal } = useWallet();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: event.target.value });
  };

  const handleStatusChange = (status: 'active' | 'ended') => {
    onFilterChange({ status });
  };

  const handleSortChange = (sortBy: 'newest' | 'popular' | 'ending_soon') => {
    onFilterChange({ sortBy });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Search polls"
          variant="outlined"
          onChange={handleSearchChange}
        />
        
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={() => handleStatusChange('active')}
          >
            Active
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleStatusChange('ended')}
          >
            Ended
          </Button>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            onClick={() => handleSortChange('newest')}
          >
            Newest
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSortChange('popular')}
          >
            Popular
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSortChange('ending_soon')}
          >
            Ending Soon
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PollFilter; 