import React from 'react';
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Button,
  Chip,
  Avatar,
} from '@mui/material';
import { Poll } from '../types';
import CountdownTimer from './CountdownTimer';

interface PollDetailProps {
  poll: Poll;
  onVote?: (optionId: string) => void;
  hasVoted?: boolean;
}

const PollDetail: React.FC<PollDetailProps> = ({
  poll,
  onVote,
  hasVoted = false,
}) => {
  const {
    title,
    description,
    options,
    endTime,
    status,
    category,
    tags,
    creator,
  } = poll;

  const totalVotesCount = options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        {description}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <CountdownTimer endTime={endTime} size="large" />
      </Box>

      {category && (
        <Chip
          label={category}
          sx={{ mr: 1, mb: 1 }}
        />
      )}

      {tags && tags.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          sx={{ width: 40, height: 40, mr: 2 }}
          src={creator}
        >
          {creator[0]}
        </Avatar>
        <Typography variant="body1">
          Created by {creator}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        {options.map((option) => {
          const percentage = totalVotesCount > 0
            ? (option.votes / totalVotesCount) * 100
            : 0;

          return (
            <Box key={option.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {option.text}
                </Typography>
                {onVote && !hasVoted && status !== 'ended' && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => onVote(option.id)}
                  >
                    Vote
                  </Button>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 60 }}>
                  {option.votes.toLocaleString()} votes
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Typography variant="body2" color="text.secondary">
        Total votes: {totalVotesCount.toLocaleString()}
      </Typography>
    </Paper>
  );
};

export default PollDetail; 