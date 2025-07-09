import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Chip,
  Grid,
  LinearProgress,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Download as DownloadIcon,
  Share as ShareIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon,
  ThumbUp as ThumbUpIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { Poll } from '../types';

interface PollResultsProps {
  poll: Poll;
  results: {
    totalVotes: number;
    uniqueVoters: number;
    participationRate: number;
    averageVotesPerUser: number;
    optionResults: {
      option: string;
      votes: number;
      percentage: number;
    }[];
    timeSeriesData: {
      date: string;
      votes: number;
    }[];
    demographicData: {
      category: string;
      value: number;
    }[];
  };
  onShare?: () => void;
  onExport?: () => void;
  onRefresh?: () => void;
  isLoading?: boolean;
  error?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const PollResults: React.FC<PollResultsProps> = ({
  poll,
  results,
  onShare,
  onExport,
  onRefresh,
  isLoading = false,
  error,
}) => {
  const timeRemaining = poll.deadline
    ? formatDistanceToNow(new Date(poll.deadline * 1000), { addSuffix: true })
    : null;

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2">
            Poll Results
          </Typography>
          <Stack direction="row" spacing={1}>
            {onRefresh && (
              <Tooltip title="Refresh">
                <IconButton onClick={onRefresh} disabled={isLoading}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            )}
            {onExport && (
              <Tooltip title="Export">
                <IconButton onClick={onExport} disabled={isLoading}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            )}
            {onShare && (
              <Tooltip title="Share">
                <IconButton onClick={onShare} disabled={isLoading}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <TrendingUpIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {results.totalVotes.toLocaleString()}
              </Typography>
              <Typography color="text.secondary">Total Votes</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {results.uniqueVoters.toLocaleString()}
              </Typography>
              <Typography color="text.secondary">Unique Voters</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <AccessTimeIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {results.participationRate.toFixed(1)}%
              </Typography>
              <Typography color="text.secondary">Participation Rate</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <LocationIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {results.averageVotesPerUser.toFixed(1)}
              </Typography>
              <Typography color="text.secondary">Avg. Votes per User</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Option Distribution
          </Typography>
          <Stack spacing={2}>
            {results.optionResults.map((result) => (
              <Box key={result.option}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{result.option}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.votes} votes ({result.percentage.toFixed(1)}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={result.percentage}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Voting Activity Over Time
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="votes" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Demographics
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={results.demographicData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {results.demographicData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1}>
            <Chip
              icon={<TrendingUpIcon />}
              label={`${results.totalVotes.toLocaleString()} total votes`}
            />
            <Chip
              icon={<PeopleIcon />}
              label={`${results.uniqueVoters.toLocaleString()} unique voters`}
            />
            <Chip
              icon={<AccessTimeIcon />}
              label={timeRemaining ? timeRemaining : 'No end time'}
            />
          </Stack>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={2}>
            {results.optionResults.map((result) => (
              <Box key={result.option}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography variant="body1">{result.option}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      {result.votes.toLocaleString()} votes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({result.percentage.toFixed(1)}%)
                    </Typography>
                    {result.percentage === 100 && (
                      <Chip
                        size="small"
                        label="Winner"
                        color="success"
                        icon={<ThumbUpIcon />}
                      />
                    )}
                  </Stack>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={result.percentage}
                  color={result.percentage === 100 ? 'success' : 'primary'}
                  sx={{ mt: 1 }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default PollResults; 