/// <reference types="react" />
/// <reference types="@mui/material" />
/// <reference types="@mui/icons-material" />

import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
} from '@mui/material';
import { Poll } from '../types';

interface PollVoteResultsProps {
  poll: Poll;
}

const PollVoteResults: React.FC<PollVoteResultsProps> = ({ poll }) => {
  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Results
      </Typography>

      <Box sx={{ mt: 2 }}>
        {poll.options.map((option) => {
          const percentage = totalVotes > 0
            ? Math.round((option.votes / totalVotes) * 100)
            : 0;

          return (
            <Box key={option.id} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">
                  {option.text}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {percentage}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={percentage}
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                {option.votes.toLocaleString()} votes
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Total votes: {totalVotes.toLocaleString()}
      </Typography>
    </Paper>
  );
};

export default PollVoteResults; 