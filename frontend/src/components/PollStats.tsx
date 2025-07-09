import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useWallet } from '../contexts/WalletContext';

interface PollStatsProps {
  stats: {
    totalVotes: number;
    uniqueVoters: number;
    averageTime: number;
    topLocation: string;
  };
  isLoading?: boolean;
  error?: string;
}

const PollStats: React.FC<PollStatsProps> = ({
  stats,
  isLoading = false,
  error,
}) => {
  const { principal } = useWallet();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TrendingUpIcon color="primary" />
                <Typography variant="h6">Total Votes</Typography>
              </Stack>
              <Typography variant="h4">{stats.totalVotes}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PeopleIcon color="primary" />
                <Typography variant="h6">Unique Voters</Typography>
              </Stack>
              <Typography variant="h4">{stats.uniqueVoters}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTimeIcon color="primary" />
                <Typography variant="h6">Average Time</Typography>
              </Stack>
              <Typography variant="h4">{stats.averageTime}s</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationIcon color="primary" />
                <Typography variant="h6">Top Location</Typography>
              </Stack>
              <Typography variant="h4">{stats.topLocation}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PollStats; 