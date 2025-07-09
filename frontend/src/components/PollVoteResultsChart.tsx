import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Alert,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PollVoteResultsChartProps {
  results: {
    id: string;
    text: string;
    votes: number;
    percentage: number;
    isWinner?: boolean;
  }[];
  isLoading?: boolean;
  error?: string;
}

const PollVoteResultsChart: React.FC<PollVoteResultsChartProps> = ({
  results,
  isLoading = false,
  error,
}) => {
  const theme = useTheme();

  const chartData = results.map((result) => ({
    name: result.text,
    votes: result.votes,
    percentage: result.percentage,
  }));

  return (
    <Box>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="h6" gutterBottom>
          Vote Distribution
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toLocaleString()} votes`,
                    'Votes',
                  ]}
                />
                <Bar
                  dataKey="votes"
                  fill={theme.palette.primary.main}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default PollVoteResultsChart; 