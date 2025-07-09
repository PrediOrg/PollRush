import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Poll } from '../types';
import { useWallet } from '../contexts/WalletContext';

interface PollReportProps {
  poll: Poll;
  onReport: (reason: string) => Promise<void>;
  isSubmitting?: boolean;
  error?: string;
}

const PollReport: React.FC<PollReportProps> = ({
  onReport,
  isSubmitting = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const { principal } = useWallet();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setReason('');
  };

  const handleSubmit = async () => {
    if (!reason.trim()) return;

    try {
      await onReport(reason.trim());
      handleClose();
    } catch (error) {
      console.error('Failed to report poll:', error);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={handleOpen}
        disabled={isSubmitting}
      >
        Report Poll
      </Button>

      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Report Poll</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Reason for reporting"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isSubmitting}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSubmit}
            disabled={isSubmitting || !reason.trim()}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PollReport; 