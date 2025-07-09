import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Pagination,
  Stack,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import PollCard from './PollCard';
import { Poll } from '../types';
import { useWallet } from '../contexts/WalletContext';

interface PollListProps {
  polls: Poll[];
  onPollClick: (poll: Poll) => void;
  onCreatePoll?: () => void;
  onFilterClick?: () => void;
  onSortClick?: () => void;
  onSearchClick?: () => void;
  isLoading?: boolean;
  error?: string;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const PollList: React.FC<PollListProps> = ({
  polls,
  onPollClick,
  onCreatePoll,
  onFilterClick,
  onSortClick,
  onSearchClick,
  isLoading = false,
  error,
  page = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const { principal } = useWallet();

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" component="h2">
          Polls
        </Typography>

        <Stack direction="row" spacing={1}>
          {onSearchClick && (
            <Tooltip title="Search">
              <IconButton onClick={onSearchClick} disabled={isLoading}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          )}
          {onFilterClick && (
            <Tooltip title="Filter">
              <IconButton onClick={onFilterClick} disabled={isLoading}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
          {onSortClick && (
            <Tooltip title="Sort">
              <IconButton onClick={onSortClick} disabled={isLoading}>
                <SortIcon />
              </IconButton>
            </Tooltip>
          )}
          {onCreatePoll && (
            <Tooltip title="Create Poll">
              <IconButton
                color="primary"
                onClick={onCreatePoll}
                disabled={isLoading}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : polls.length === 0 ? (
        <Box sx={{ textAlign: 'center', p: 3 }}>
          <Typography color="text.secondary">
            No polls found. Create one to get started!
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {polls.map((poll) => (
              <Grid item xs={12} sm={6} md={4} key={poll.id}>
                <PollCard
                  key={poll.id}
                  poll={poll}
                />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && onPageChange && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => onPageChange(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default PollList; 