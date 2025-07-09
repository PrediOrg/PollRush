import React, { useState, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Chip,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

export type SortOption = 'newest' | 'oldest' | 'popular' | 'rewards';
export type FilterOption = 'active' | 'expired' | 'voted' | 'created';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSort: (option: SortOption) => void;
  onFilter: (filters: FilterOption[]) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onSort,
  onFilter,
  placeholder = 'Search polls...',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, onSearch]);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (option: SortOption) => {
    setSelectedSort(option);
    onSort(option);
    handleFilterClose();
  };

  const handleFilterToggle = (filter: FilterOption) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    
    setSelectedFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
    onFilter([]);
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rewards', label: 'Highest Rewards' },
  ];

  const filterOptions: { value: FilterOption; label: string }[] = [
    { value: 'active', label: 'Active Polls' },
    { value: 'expired', label: 'Expired Polls' },
    { value: 'voted', label: 'Voted Polls' },
    { value: 'created', label: 'Created Polls' },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchQuery('')}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          color={selectedFilters.length > 0 ? 'primary' : 'default'}
          onClick={handleFilterClick}
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      {(selectedFilters.length > 0 || selectedSort !== 'newest') && (
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {selectedFilters.map((filter) => (
            <Chip
              key={filter}
              label={filterOptions.find(f => f.value === filter)?.label}
              onDelete={() => handleFilterToggle(filter)}
              color="primary"
              variant="outlined"
            />
          ))}
          {selectedSort !== 'newest' && (
            <Chip
              label={`Sorted by: ${sortOptions.find(s => s.value === selectedSort)?.label}`}
              onDelete={() => handleSortChange('newest')}
              color="secondary"
              variant="outlined"
            />
          )}
          {(selectedFilters.length > 0 || selectedSort !== 'newest') && (
            <Chip
              label="Clear All"
              onClick={handleClearFilters}
              color="default"
              variant="outlined"
            />
          )}
        </Stack>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
        PaperProps={{
          sx: { width: 250, maxWidth: '100%' },
        }}
      >
        <MenuItem disabled sx={{ opacity: 0.7 }}>
          Sort By
        </MenuItem>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            selected={selectedSort === option.value}
          >
            {option.label}
          </MenuItem>
        ))}
        <MenuItem disabled sx={{ opacity: 0.7, mt: 1 }}>
          Filter By
        </MenuItem>
        {filterOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleFilterToggle(option.value)}
            selected={selectedFilters.includes(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SearchBar; 