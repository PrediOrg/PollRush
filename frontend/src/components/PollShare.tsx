import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Share as ShareIcon,
  Close as CloseIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import { Poll } from '../types';
import { useWallet } from '../contexts/WalletContext';

interface PollShareProps {
  poll: Poll;
  onShare: (platform: string) => Promise<void>;
  isSubmitting?: boolean;
  error?: string;
}

const PollShare: React.FC<PollShareProps> = ({
  poll,
  onShare,
  isSubmitting = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { principal } = useWallet();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleShare = async (platform: string) => {
    try {
      await onShare(platform);
      handleClose();
    } catch (error) {
      console.error('Failed to share poll:', error);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ShareIcon />}
        onClick={handleOpen}
        disabled={isSubmitting}
      >
        Share
      </Button>

      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Share Poll</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}

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

            <TextField
              fullWidth
              value={window.location.href}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton onClick={handleCopy}>
                    <ContentCopyIcon />
                  </IconButton>
                ),
              }}
              helperText={copied ? 'Link copied!' : 'Click to copy link'}
            />

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={() => handleShare('twitter')}
                disabled={isSubmitting}
              >
                Twitter
              </Button>
              <Button
                variant="contained"
                onClick={() => handleShare('facebook')}
                disabled={isSubmitting}
              >
                Facebook
              </Button>
              <Button
                variant="contained"
                onClick={() => handleShare('linkedin')}
                disabled={isSubmitting}
              >
                LinkedIn
              </Button>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PollShare; 