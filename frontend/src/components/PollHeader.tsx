import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { Poll } from '../types';
import CountdownTimer from './CountdownTimer';

interface PollHeaderProps {
  poll: Poll & {
    creatorName?: string;
    creatorAvatar?: string;
  };
  onShare?: () => void;
  onBookmark?: () => void;
  onDelete?: () => void;
  isBookmarked?: boolean;
}

const PollHeader: React.FC<PollHeaderProps> = ({
  poll,
  onShare,
  onBookmark,
  onDelete,
  isBookmarked = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    onDelete?.();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {poll.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {poll.description}
          </Typography>
        </Box>

        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Box sx={{ mb: 3 }}>
        <CountdownTimer endTime={poll.endTime} size="large" />
      </Box>

      {poll.category && (
        <Box sx={{ mb: 2 }}>
          <Chip
            label={poll.category}
            sx={{ mr: 1 }}
          />
        </Box>
      )}

      {poll.tags && poll.tags.length > 0 && (
        <Box sx={{ mb: 2 }}>
          {poll.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          sx={{ width: 40, height: 40, mr: 2 }}
          src={poll.creatorAvatar}
        >
          {poll.creatorName?.[0] || poll.creator[0]}
        </Avatar>
        <Typography variant="body1">
          Created by {poll.creatorName || poll.creator}
        </Typography>
      </Box>

      {poll.isAnonymous && (
        <Box sx={{ mb: 2 }}>
          <Chip
            label="Anonymous Voting"
            color="primary"
            variant="outlined"
          />
        </Box>
      )}

      {poll.requireAuthentication && (
        <Box sx={{ mb: 2 }}>
          <Chip
            label="Authentication Required"
            color="primary"
            variant="outlined"
          />
        </Box>
      )}

      {poll.allowMultipleVotes && (
        <Box sx={{ mb: 2 }}>
          <Chip
            label="Multiple Votes Allowed"
            color="primary"
            variant="outlined"
          />
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={onShare}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem onClick={onBookmark}>
          <ListItemIcon>
            {isBookmarked ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>{isBookmarked ? 'Remove Bookmark' : 'Bookmark'}</ListItemText>
        </MenuItem>
        {onDelete && (
          <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete Poll</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default PollHeader; 