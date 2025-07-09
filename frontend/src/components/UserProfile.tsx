import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  Button,
  Divider,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  History as HistoryIcon,
  HowToVote as VoteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { User } from '../types';
import { formatTokenAmount } from '../utils/format';
import { TOKEN_SYMBOL } from '../config/constants';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface UserProfileProps {
  user: User;
  isLoading?: boolean;
  error?: string;
  onEdit?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isLoading = false,
  error,
  onEdit,
}) => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 64, height: 64 }}
            >
              {user.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h5">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.principal}
              </Typography>
            </Box>
          </Stack>
          {onEdit && (
            <Button
              startIcon={<EditIcon />}
              onClick={onEdit}
              variant="outlined"
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Divider />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Balance
              </Typography>
              <Typography variant="h6">
                {formatTokenAmount(user.balance || 0, TOKEN_SYMBOL)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Created Polls
              </Typography>
              <Typography variant="h6">
                {user.created_polls?.length || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Participated Polls
              </Typography>
              <Typography variant="h6">
                {user.participated_polls?.length || 0}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2}>
          <Button
            startIcon={<HistoryIcon />}
            onClick={() => navigate('/my-polls')}
            variant="outlined"
            fullWidth
          >
            My Polls
          </Button>
          <Button
            startIcon={<VoteIcon />}
            onClick={() => navigate('/my-attendance')}
            variant="outlined"
            fullWidth
          >
            My Attendance
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default UserProfile; 