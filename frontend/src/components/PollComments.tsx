import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Send as SendIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Flag as FlagIcon,
  Reply as ReplyIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useWallet } from '../contexts/WalletContext';

interface Comment {
  id: string;
  text: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
  isEdited?: boolean;
  parentId?: string;
  replies?: Comment[];
}

interface PollCommentsProps {
  comments: Comment[];
  onAddComment: (text: string, parentId?: string) => Promise<void>;
  onEditComment: (id: string, text: string) => Promise<void>;
  onDeleteComment: (id: string) => Promise<void>;
  onReportComment: (id: string) => Promise<void>;
  onReply: (id: string) => void;
  error?: string;
  currentUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

const PollComments: React.FC<PollCommentsProps> = ({
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onReportComment,
  onReply,
  error,
  currentUser,
}) => {
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { principal } = useWallet();

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment(newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditComment = async () => {
    if (!editingComment || !editText.trim()) return;

    setIsSubmitting(true);
    try {
      await onEditComment(editingComment, editText.trim());
      setEditingComment(null);
      setEditText('');
    } catch (error) {
      console.error('Failed to edit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!selectedComment) return;

    setIsSubmitting(true);
    try {
      await onDeleteComment(selectedComment);
      setMenuAnchor(null);
      setSelectedComment(null);
    } catch (error) {
      console.error('Failed to delete comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReportComment = async () => {
    if (!selectedComment) return;

    setIsSubmitting(true);
    try {
      await onReportComment(selectedComment);
      setMenuAnchor(null);
      setSelectedComment(null);
    } catch (error) {
      console.error('Failed to report comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, commentId: string) => {
    setMenuAnchor(event.currentTarget);
    setSelectedComment(commentId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedComment(null);
  };

  const renderComment = (comment: Comment) => (
    <Box key={comment.id} sx={{ mb: 2 }}>
      <Stack direction="row" spacing={2}>
        <Avatar src={comment.author.avatar} alt={comment.author.name}>
          {comment.author.name[0]}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">{comment.author.name}</Typography>
            <IconButton
              size="small"
              onClick={(e) => handleMenuOpen(e, comment.id)}
              disabled={isSubmitting}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Stack>
          {editingComment === comment.id ? (
            <Box sx={{ mt: 1 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                disabled={isSubmitting}
              />
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button
                  size="small"
                  onClick={() => {
                    setEditingComment(null);
                    setEditText('');
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleEditComment}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </Stack>
            </Box>
          ) : (
            <>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {comment.text}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                </Typography>
                {comment.isEdited && (
                  <Typography variant="caption" color="text.secondary">
                    (edited)
                  </Typography>
                )}
                <Button
                  size="small"
                  startIcon={<ReplyIcon fontSize="small" />}
                  onClick={() => onReply(comment.id)}
                  disabled={isSubmitting}
                >
                  Reply
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </Stack>

      {comment.replies && comment.replies.length > 0 && (
        <Box sx={{ ml: 4, mt: 2 }}>
          {comment.replies.map((reply) => renderComment(reply))}
        </Box>
      )}
    </Box>
  );

  return (
    <Box>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <Box>
          <Typography variant="h6" gutterBottom>
            Comments ({comments.length})
          </Typography>
          {comments.map(renderComment)}
        </Box>

        {currentUser && (
          <Box>
            <Stack direction="row" spacing={1}>
              <Avatar src={currentUser.avatar} alt={currentUser.name}>
                {currentUser.name[0]}
              </Avatar>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isSubmitting}
              />
              <Button
                variant="contained"
                onClick={handleAddComment}
                disabled={isSubmitting || !newComment.trim()}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
              >
                Post
              </Button>
            </Stack>
          </Box>
        )}

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => {
            setEditingComment(selectedComment);
            setEditText(comments.find(c => c.id === selectedComment)?.text || '');
            handleMenuClose();
          }}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteComment}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleReportComment}>
            <ListItemIcon>
              <FlagIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Report</ListItemText>
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );
};

export default PollComments; 