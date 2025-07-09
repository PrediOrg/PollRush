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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PollVoteResultsTrendProps {
  results: {
    id: string;
    text: string;
    votes: number;
    percentage: number;
    isWinner?: boolean;
    trend?: {
      data: {
        date: string;
        votes: number;
      }[];
    };
  }[];
  isLoading?: boolean;
  error?: string;
}

const PollVoteResultsTrend: React.FC<PollVoteResultsTrendProps> = ({
  results,
  isLoading = false,
  error,
}) => {
  const theme = useTheme();

  const chartData = results.reduce((acc, result) => {
    if (result.trend?.data) {
      result.trend.data.forEach((point) => {
        const existingPoint = acc.find((p) => p.date === point.date);
        if (existingPoint) {
          existingPoint[result.text] = point.votes;
        } else {
          acc.push({
            date: point.date,
            [result.text]: point.votes,
          });
        }
      });
    }
    return acc;
  }, [] as any[]);

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
          Vote Trends
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {results.map((result, index) => (
                  <Line
                    key={result.id}
                    type="monotone"
                    dataKey={result.text}
                    stroke={COLORS[index % COLORS.length]}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default PollVoteResultsTrend; 