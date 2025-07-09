import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import type { Poll } from '../types';

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  poll: Poll;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  open,
  onClose,
  poll,
}) => {
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);
  const pollUrl = `${window.location.origin}/poll/${poll.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pollUrl);
      setShowCopiedAlert(true);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleCloseAlert = () => {
    setShowCopiedAlert(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Share Poll
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              {poll.title}
            </Typography>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Share this poll with others:
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              fullWidth
              value={pollUrl}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
            <IconButton
              onClick={handleCopyLink}
              color="primary"
              size="small"
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Anyone with this link can view and vote on this poll.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showCopiedAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
        >
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareDialog; 