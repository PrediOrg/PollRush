import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useWallet } from '../contexts/WalletContext';

interface PollSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const PollSearch: React.FC<PollSearchProps> = ({
  onSearch,
  placeholder = 'Search polls...',
}) => {
  const [query, setQuery] = useState('');
  const { principal } = useWallet();

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <Box>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default PollSearch; 