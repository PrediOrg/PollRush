import React, { useState } from 'react';
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { Poll } from '../types';

interface PollVoteProps {
  poll: Poll;
  onVote: (optionId: string) => void;
  hasVoted?: boolean;
}

const PollVote: React.FC<PollVoteProps> = ({
  poll,
  onVote,
  hasVoted = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleVote = () => {
    if (selectedOption) {
      onVote(selectedOption);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Cast Your Vote
      </Typography>

      <RadioGroup
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {poll.options.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.id}
            control={<Radio />}
            label={option.text}
            disabled={hasVoted || poll.status === 'ended'}
          />
        ))}
      </RadioGroup>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleVote}
          disabled={!selectedOption || hasVoted || poll.status === 'ended'}
        >
          {poll.status === 'ended'
            ? 'Poll Ended'
            : hasVoted
            ? 'Already Voted'
            : 'Submit Vote'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PollVote; 