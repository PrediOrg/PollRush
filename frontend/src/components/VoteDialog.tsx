import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useWallet } from '../contexts/WalletContext';
import type { Poll } from '../types';
import { TOKEN_SYMBOL } from '../config/constants';
import { formatTokenAmount } from '../utils/helpers';

interface VoteDialogProps {
  open: boolean;
  onClose: () => void;
  poll: Poll;
  onVote: (optionId: number) => Promise<void>;
}

const VoteDialog: React.FC<VoteDialogProps> = ({
  open,
  onClose,
  poll,
  onVote,
}) => {
  const { principal, isConnected } = useWallet();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value));
    setError(null);
  };

  const handleVote = async () => {
    if (selectedOption === null) {
      setError('Please select an option to vote');
      return;
    }

    setIsVoting(true);
    setError(null);

    try {
      await onVote(selectedOption);
      onClose();
    } catch (err) {
      setError('Failed to submit vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  const handleClose = () => {
    setSelectedOption(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Vote on Poll
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {poll.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reward: {formatTokenAmount(poll.rewards?.amount || 0, TOKEN_SYMBOL)}
          </Typography>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Select your vote:
        </Typography>

        <RadioGroup
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {poll.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={<Radio />}
              label={option.toString()}
              disabled={isVoting}
            />
          ))}
        </RadioGroup>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={isVoting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleVote}
          variant="contained"
          disabled={isVoting || selectedOption === null}
          startIcon={isVoting ? <CircularProgress size={20} /> : null}
        >
          {isVoting ? 'Voting...' : 'Submit Vote'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VoteDialog; 