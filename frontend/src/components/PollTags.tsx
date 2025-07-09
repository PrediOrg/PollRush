import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface PollTagsProps {
  tags: string[];
  onAddTag: (tag: string) => Promise<void>;
  onDeleteTag: (tag: string) => Promise<void>;
  isSubmitting?: boolean;
  error?: string;
}

const PollTags: React.FC<PollTagsProps> = ({
  tags,
  onAddTag,
  onDeleteTag,
  isSubmitting = false,
  error,
}) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = async () => {
    if (!newTag.trim()) return;

    try {
      await onAddTag(newTag.trim());
      setNewTag('');
    } catch (error) {
      console.error('Failed to add tag:', error);
    }
  };

  const handleDeleteTag = async (tag: string) => {
    try {
      await onDeleteTag(tag);
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              disabled={isSubmitting}
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={1}>
          <TextField
            label="Add Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            disabled={isSubmitting}
            size="small"
          />
          <Button
            variant="contained"
            onClick={handleAddTag}
            disabled={isSubmitting || !newTag.trim()}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <AddIcon />}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PollTags; 