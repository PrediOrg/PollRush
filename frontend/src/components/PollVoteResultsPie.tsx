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
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface PollVoteResultsPieProps {
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

const PollVoteResultsPie: React.FC<PollVoteResultsPieProps> = ({
  results,
  isLoading = false,
  error,
}) => {
  const theme = useTheme();

  const chartData = results.map((result) => ({
    name: result.text,
    value: result.votes,
    percentage: result.percentage,
  }));

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.info.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];

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
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) =>
                    `${name} (${percentage.toFixed(1)}%)`
                  }
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value.toLocaleString()} votes`,
                    name,
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default PollVoteResultsPie; 