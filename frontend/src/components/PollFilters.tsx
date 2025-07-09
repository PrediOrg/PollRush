import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Collapse,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface PollFiltersProps {
  categories: string[];
  tags: string[];
  onFilterChange: (filters: {
    search: string;
    category?: string;
    tags: string[];
    status?: 'active' | 'ended' | 'all';
    sortBy?: 'newest' | 'popular' | 'ending';
  }) => void;
  initialFilters?: {
    search?: string;
    category?: string;
    tags?: string[];
    status?: 'active' | 'ended' | 'all';
    sortBy?: 'newest' | 'popular' | 'ending';
  };
}

const PollFilters: React.FC<PollFiltersProps> = ({
  categories,
  tags,
  onFilterChange,
  initialFilters = {},
}) => {
  const [search, setSearch] = useState(initialFilters.search || '');
  const [category, setCategory] = useState(initialFilters.category || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(initialFilters.tags || []);
  const [status, setStatus] = useState<'active' | 'ended' | 'all'>(initialFilters.status || 'all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'ending'>(initialFilters.sortBy || 'newest');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onFilterChange({
      search: value,
      category,
      tags: selectedTags,
      status,
      sortBy,
    });
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
    onFilterChange({
      search,
      category: event.target.value,
      tags: selectedTags,
      status,
      sortBy,
    });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFilterChange({
      search,
      category,
      tags: newTags,
      status,
      sortBy,
    });
  };

  const handleStatusChange = (event: SelectChangeEvent<'all' | 'ended' | 'active'>) => {
    setStatus(event.target.value as 'all' | 'ended' | 'active');
    onFilterChange({
      search,
      category,
      tags: selectedTags,
      status: event.target.value as 'all' | 'ended' | 'active',
      sortBy,
    });
  };

  const handleSortChange = (event: SelectChangeEvent<'newest' | 'popular' | 'ending'>) => {
    setSortBy(event.target.value as 'newest' | 'popular' | 'ending');
    onFilterChange({
      search,
      category,
      tags: selectedTags,
      status,
      sortBy: event.target.value as 'newest' | 'popular' | 'ending',
    });
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setSelectedTags([]);
    setStatus('all');
    setSortBy('newest');
    onFilterChange({
      search: '',
      category: '',
      tags: [],
      status: 'all',
      sortBy: 'newest',
    });
  };

  const hasActiveFilters = search || category || selectedTags.length > 0 || status !== 'all';

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FilterListIcon />
            <Typography variant="h6">Filters</Typography>
          </Stack>
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        <TextField
          fullWidth
          size="small"
          placeholder="Search polls..."
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearch('')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Collapse in={isExpanded}>
          <Stack spacing={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="ended">Ended</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="ending">Ending Soon</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Tags
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => handleTagToggle(tag)}
                    color={selectedTags.includes(tag) ? 'primary' : 'default'}
                    variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Collapse>

        {hasActiveFilters && (
          <>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {search && (
                  <Chip
                    label={`Search: ${search}`}
                    onDelete={() => setSearch('')}
                  />
                )}
                {category && (
                  <Chip
                    label={`Category: ${category}`}
                    onDelete={() => setCategory('')}
                  />
                )}
                {selectedTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagToggle(tag)}
                  />
                ))}
                {status !== 'all' && (
                  <Chip
                    label={`Status: ${status}`}
                    onDelete={() => setStatus('all')}
                  />
                )}
              </Stack>
              <Button
                size="small"
                onClick={handleClearFilters}
                startIcon={<ClearIcon />}
              >
                Clear All
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export default PollFilters; 