import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
  Button,
  Alert,
  CircularProgress,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Poll } from '../types';
import { useWallet } from '../contexts/WalletContext';

interface PollSettingsProps {
  poll: Poll;
  onUpdateSettings: (settings: Partial<Poll>) => Promise<void>;
  open: boolean;
  onClose: () => void;
}

const PollSettings: React.FC<PollSettingsProps> = ({
  poll,
  onUpdateSettings,
  open,
  onClose,
}) => {
  const [settings, setSettings] = useState({
    isAnonymous: poll.isAnonymous || false,
    allowComments: poll.requireAuthentication || false,
    allowMultipleVotes: poll.allowMultipleVotes || false,
    showResults: true,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { principal } = useWallet();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    await onUpdateSettings({ status: 'ended' });
    setIsDeleteDialogOpen(false);
  };

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [name]: event.target.checked,
    });
  };

  const handleSave = async () => {
    try {
      await onUpdateSettings({
        isAnonymous: settings.isAnonymous,
        requireAuthentication: settings.allowComments,
        allowMultipleVotes: settings.allowMultipleVotes,
      });
      onClose();
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Poll Settings</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.isAnonymous}
                onChange={handleChange('isAnonymous')}
              />
            }
            label="Anonymous Voting"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
            Hide voter identities in poll results
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={settings.allowComments}
                onChange={handleChange('allowComments')}
              />
            }
            label="Allow Comments"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
            Enable comments on this poll
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={settings.allowMultipleVotes}
                onChange={handleChange('allowMultipleVotes')}
              />
            }
            label="Allow Multiple Votes"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
            Let users vote multiple times
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={settings.showResults}
                onChange={handleChange('showResults')}
              />
            }
            label="Show Results"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
            Display poll results to voters
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PollSettings; 