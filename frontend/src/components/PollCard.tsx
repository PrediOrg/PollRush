import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Button,
} from '@mui/material';
import { Poll } from '../types';
import CountdownTimer from './CountdownTimer';

interface PollCardProps {
  poll: Poll;
  onVote?: (pollId: string) => void;
}

const PollCard: React.FC<PollCardProps> = ({ poll, onVote }) => {
  const {
    id,
    title,
    description,
    endTime,
    status,
    category,
    tags,
    creator,
  } = poll;

  return (
    <Card
      component={RouterLink}
      to={`/poll/${id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <CountdownTimer endTime={endTime} size="small" />
        </Box>

        {category && (
          <Chip
            label={category}
            size="small"
            sx={{ mr: 1, mb: 1 }}
          />
        )}

        {tags && tags.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ width: 32, height: 32, mr: 1 }}
            src={creator}
          >
            {creator[0]}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {creator}
          </Typography>
        </Box>

        {onVote && (
          <Button
            variant="contained"
            fullWidth
            onClick={(e) => {
              e.preventDefault();
              onVote(id);
            }}
            disabled={status === 'ended'}
          >
            {status === 'ended' ? 'Poll Ended' : 'Vote'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PollCard; 