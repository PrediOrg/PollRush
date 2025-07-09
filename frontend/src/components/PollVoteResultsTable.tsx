import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material';

interface PollVoteResultsTableProps {
  results: {
    id: string;
    text: string;
    votes: number;
    percentage: number;
    isWinner?: boolean;
    trend?: {
      value: number;
      isPositive: boolean;
    };
  }[];
  totalVotes: number;
  isLoading?: boolean;
  error?: string;
}

const PollVoteResultsTable: React.FC<PollVoteResultsTableProps> = ({
  results,
  totalVotes,
  isLoading = false,
  error,
}) => {
  return (
    <Box>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="h6" gutterBottom>
          Vote Results
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Option</TableCell>
                  <TableCell align="right">Votes</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                  <TableCell align="right">Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result) => (
                  <TableRow
                    key={result.id}
                    sx={{
                      backgroundColor: result.isWinner
                        ? 'success.light'
                        : 'inherit',
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Stack direction="row" spacing={1} alignItems="center">
                        {result.text}
                        {result.isWinner && (
                          <ThumbUpIcon color="success" fontSize="small" />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      {result.votes.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {result.percentage.toFixed(1)}%
                    </TableCell>
                    <TableCell align="right">
                      {result.trend && (
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                          justifyContent="flex-end"
                        >
                          {result.trend.isPositive ? (
                            <TrendingUpIcon color="success" fontSize="small" />
                          ) : (
                            <TrendingDownIcon color="error" fontSize="small" />
                          )}
                          <Typography
                            variant="body2"
                            color={
                              result.trend.isPositive
                                ? 'success.main'
                                : 'error.main'
                            }
                          >
                            {result.trend.value}%
                          </Typography>
                        </Stack>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">Total</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2">
                      {totalVotes.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2">100%</Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Box>
  );
};

export default PollVoteResultsTable; 