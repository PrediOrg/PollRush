import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import { formatDistanceToNow } from 'date-fns';

interface Vote {
  id: string;
  voter: {
    id: string;
    name: string;
    avatar?: string;
  };
  optionId: string;
  optionText: string;
  timestamp: number;
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  text: string;
  timestamp: number;
  isEdited?: boolean;
}

interface PollUpdate {
  id: string;
  updater: {
    id: string;
    name: string;
    avatar?: string;
  };
  type: 'settings' | 'options' | 'deadline' | 'rewards';
  description: string;
  timestamp: number;
}

interface PollHistoryProps {
  votes: Vote[];
  comments: Comment[];
  updates: PollUpdate[];
  onVoteClick?: (voteId: string) => void;
  onCommentClick?: (commentId: string) => void;
  onUpdateClick?: (updateId: string) => void;
}

const PollHistory: React.FC<PollHistoryProps> = ({
  votes,
  comments,
  updates,
  onVoteClick,
  onCommentClick,
  onUpdateClick,
}) => {
  const allEvents = [
    ...votes.map(vote => ({
      ...vote,
      type: 'vote' as const,
    })),
    ...comments.map(comment => ({
      ...comment,
      type: 'comment' as const,
    })),
    ...updates.map(update => ({
      ...update,
      type: 'update' as const,
    })),
  ].sort((a, b) => b.timestamp - a.timestamp);

  const getEventIcon = (type: 'vote' | 'comment' | 'update') => {
    switch (type) {
      case 'vote':
        return <HowToVoteIcon color="primary" />;
      case 'comment':
        return <CommentIcon color="info" />;
      case 'update':
        return <EditIcon color="warning" />;
    }
  };

  const getEventColor = (type: 'vote' | 'comment' | 'update') => {
    switch (type) {
      case 'vote':
        return 'primary';
      case 'comment':
        return 'info';
      case 'update':
        return 'warning';
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Poll History
      </Typography>

      <List>
        {allEvents.map((event, index) => (
          <React.Fragment key={event.id}>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem
              alignItems="flex-start"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              onClick={() => {
                switch (event.type) {
                  case 'vote':
                    onVoteClick?.(event.id);
                    break;
                  case 'comment':
                    onCommentClick?.(event.id);
                    break;
                  case 'update':
                    onUpdateClick?.(event.id);
                    break;
                }
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={
                    event.type === 'vote'
                      ? event.voter.avatar
                      : event.type === 'comment'
                      ? event.author.avatar
                      : event.updater.avatar
                  }
                >
                  {getEventIcon(event.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2">
                      {event.type === 'vote'
                        ? event.voter.name
                        : event.type === 'comment'
                        ? event.author.name
                        : event.updater.name}
                    </Typography>
                    <Chip
                      label={event.type}
                      size="small"
                      color={getEventColor(event.type)}
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {event.type === 'vote'
                        ? `Voted for "${event.optionText}"`
                        : event.type === 'comment'
                        ? event.text
                        : event.description}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block' }}
                    >
                      {formatDistanceToNow(event.timestamp * 1000, {
                        addSuffix: true,
                      })}
                      {event.type === 'comment' && event.isEdited && ' (edited)'}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>

      {allEvents.length === 0 && (
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          <Typography>No activity yet</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default PollHistory; 