import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  Poll as PollIcon,
  HowToVote as VoteIcon,
  People as PeopleIcon,
  EmojiEvents as RewardIcon,
} from '@mui/icons-material';
import { PollStats } from '../types';

const TOKEN_SYMBOL = 'ICP';

const Stats: React.FC = () => {
  const [stats, setStats] = useState<PollStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Call your canister method to get stats
        // const response = await pollCanister.get_stats();
        // setStats(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to load stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PollIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="div">
            {stats.totalPolls}
          </Typography>
          <Typography color="text.secondary">Total Polls</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <VoteIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="div">
            {stats.totalVotes}
          </Typography>
          <Typography color="text.secondary">Total Votes</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="div">
            {stats.totalUsers}
          </Typography>
          <Typography color="text.secondary">Total Users</Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <RewardIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" component="div">
            {stats.total_rewards_distributed || 0}
          </Typography>
          <Typography color="text.secondary">
            {TOKEN_SYMBOL} Distributed
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Stats; 