import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  IconButton,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  EmojiEvents as EmojiEventsIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { Poll } from '../types';
import { useWallet } from '../contexts/WalletContext';

interface Reward {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  maxRecipients: number;
  currentRecipients: number;
  isClaimed?: boolean;
}

interface PollRewardsProps {
  poll: Poll;
  rewards: Reward[];
  userBalance?: number;
  onAddReward?: (reward: Omit<Reward, 'id' | 'currentRecipients'>) => Promise<void>;
  onDeleteReward?: (rewardId: string) => Promise<void>;
  onClaimReward?: (rewardId: string) => Promise<void>;
  isSubmitting?: boolean;
  error?: string;
}

const PollRewards: React.FC<PollRewardsProps> = ({
  poll,
  rewards,
  userBalance = 0,
  onAddReward,
  onDeleteReward,
  onClaimReward,
  isSubmitting = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newReward, setNewReward] = useState<Omit<Reward, 'id' | 'currentRecipients'>>({
    title: '',
    description: '',
    amount: 0,
    currency: 'ICP',
    maxRecipients: 1,
  });

  const { principal } = useWallet();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setNewReward({
      title: '',
      description: '',
      amount: 0,
      currency: 'ICP',
      maxRecipients: 1,
    });
  };

  const handleAddReward = async () => {
    if (!newReward.title.trim()) return;

    try {
      if (onAddReward) {
        await onAddReward(newReward);
      }
      handleClose();
    } catch (error) {
      console.error('Failed to add reward:', error);
    }
  };

  const handleDeleteReward = async (rewardId: string) => {
    try {
      if (onDeleteReward) {
        await onDeleteReward(rewardId);
      }
    } catch (error) {
      console.error('Failed to delete reward:', error);
    }
  };

  const handleClaimReward = async (rewardId: string) => {
    try {
      if (onClaimReward) {
        await onClaimReward(rewardId);
      }
    } catch (error) {
      console.error('Failed to claim reward:', error);
    }
  };

  const totalRewards = rewards.reduce((sum, reward) => sum + reward.amount, 0);
  const remainingRecipients = rewards.reduce(
    (sum, reward) => sum + (reward.maxRecipients - reward.currentRecipients),
    0
  );

  return (
    <>
      <IconButton onClick={handleOpen}>
        <EmojiEventsIcon />
      </IconButton>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Poll Rewards</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                {poll.title}
              </Typography>
              {poll.description && (
                <Typography color="text.secondary" paragraph>
                  {poll.description}
                </Typography>
              )}
            </Box>

            <Divider />

            <Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  icon={<EmojiEventsIcon />}
                  label={`${totalRewards} ${rewards[0]?.currency || 'ICP'} Total`}
                  color="primary"
                />
                <Chip
                  label={`${remainingRecipients} Recipients Remaining`}
                  color="secondary"
                />
                {userBalance !== undefined && (
                  <Chip
                    label={`${userBalance} ${rewards[0]?.currency || 'ICP'} Balance`}
                    variant="outlined"
                  />
                )}
              </Stack>
            </Box>

            <List>
              {rewards.map((reward) => (
                <ListItem
                  key={reward.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemIcon>
                    <EmojiEventsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={reward.title}
                    secondary={
                      <Stack spacing={0.5}>
                        <Typography variant="body2" color="text.secondary">
                          {reward.description}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            size="small"
                            label={`${reward.amount} ${reward.currency}`}
                            color="primary"
                            variant="outlined"
                          />
                          <Chip
                            size="small"
                            label={`${reward.currentRecipients}/${reward.maxRecipients} Claimed`}
                            color="secondary"
                            variant="outlined"
                          />
                        </Stack>
                      </Stack>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Stack direction="row" spacing={1}>
                      {!reward.isClaimed && (
                        <Tooltip title="Claim Reward">
                          <IconButton
                            edge="end"
                            onClick={() => handleClaimReward(reward.id)}
                            disabled={isSubmitting}
                          >
                            <CheckIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete Reward">
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteReward(reward.id)}
                          disabled={isSubmitting}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Add New Reward
              </Typography>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Title"
                  value={newReward.title}
                  onChange={(e) => setNewReward({ ...newReward, title: e.target.value })}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Description"
                  value={newReward.description}
                  onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Amount"
                  type="number"
                  value={newReward.amount}
                  onChange={(e) => setNewReward({ ...newReward, amount: Number(e.target.value) })}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Max Recipients"
                  type="number"
                  value={newReward.maxRecipients}
                  onChange={(e) => setNewReward({ ...newReward, maxRecipients: Number(e.target.value) })}
                />
                <Button
                  variant="contained"
                  onClick={handleAddReward}
                  disabled={isSubmitting || !newReward.title.trim()}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : <AddIcon />}
                >
                  Add Reward
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PollRewards; 