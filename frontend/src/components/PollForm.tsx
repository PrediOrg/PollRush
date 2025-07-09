import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
  Chip,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Poll } from '../types';

interface PollFormData extends Partial<Poll> {
  isAnonymous?: boolean;
  isAuthenticated?: boolean;
  isMultipleChoice?: boolean;
  maxVotes?: number;
  customMessage?: string;
}

interface PollFormProps {
  poll?: PollFormData;
  categories: string[];
  onSubmit: (poll: PollFormData) => void;
  isSubmitting?: boolean;
  error?: string;
}

const PollForm: React.FC<PollFormProps> = ({
  poll,
  categories,
  onSubmit,
  isSubmitting = false,
  error,
}) => {
  const [title, setTitle] = useState(poll?.title || '');
  const [description, setDescription] = useState(poll?.description || '');
  const [options, setOptions] = useState<string[]>(poll?.options?.map(opt => opt.text) || ['']);
  const [category, setCategory] = useState(poll?.category || '');
  const [tags, setTags] = useState<string[]>(poll?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [deadline, setDeadline] = useState(
    poll?.deadline ? new Date(poll.deadline).toISOString().slice(0, 16) : ''
  );
  const [isAnonymous, setIsAnonymous] = useState(poll?.isAnonymous || false);
  const [isAuthenticated, setIsAuthenticated] = useState(poll?.isAuthenticated || false);
  const [isMultipleChoice, setIsMultipleChoice] = useState(poll?.isMultipleChoice || false);
  const [maxVotes, setMaxVotes] = useState<string>(poll?.maxVotes?.toString() || '');
  const [customMessage, setCustomMessage] = useState(poll?.customMessage || '');
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!title.trim()) {
      errors.title = 'Title is required';
    }

    if (!description.trim()) {
      errors.description = 'Description is required';
    }

    if (options.length < 2) {
      errors.options = 'At least 2 options are required';
    } else if (options.some((option) => !option.trim())) {
      errors.options = 'All options must be filled';
    }

    if (!category) {
      errors.category = 'Category is required';
    }

    if (isMultipleChoice && maxVotes) {
      const maxVotesNum = parseInt(maxVotes);
      if (isNaN(maxVotesNum) || maxVotesNum < 2) {
        errors.maxVotes = 'Maximum votes must be at least 2';
      } else if (maxVotesNum > options.length) {
        errors.maxVotes = 'Maximum votes cannot exceed number of options';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData: PollFormData = {
      title,
      description,
      options: options.map((text, index) => ({ id: index.toString(), text, votes: 0 })),
      deadline: deadline ? new Date(deadline).getTime() : undefined,
      category,
      tags,
      isAnonymous,
      isAuthenticated,
      isMultipleChoice,
      maxVotes: maxVotes ? parseInt(maxVotes) : undefined,
      customMessage,
    };

    onSubmit(formData);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOptions(items);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        {/* Title and Description */}
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!validationErrors.title}
            helperText={validationErrors.title}
            required
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!validationErrors.description}
            helperText={validationErrors.description}
            required
            multiline
            rows={3}
            fullWidth
          />
        </Stack>

        {/* Options */}
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Options
            {validationErrors.options && (
              <Typography
                component="span"
                color="error"
                variant="caption"
                sx={{ ml: 1 }}
              >
                {validationErrors.options}
              </Typography>
            )}
          </Typography>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="options">
              {(provided) => (
                <Stack
                  spacing={2}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {options.map((option, index) => (
                    <Draggable
                      key={index}
                      draggableId={`option-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <Box {...provided.dragHandleProps}>
                            <DragIcon color="action" />
                          </Box>
                          <TextField
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            fullWidth
                            required
                          />
                          {options.length > 1 && (
                            <IconButton
                              onClick={() => handleRemoveOption(index)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddOption}
            sx={{ mt: 2 }}
          >
            Add Option
          </Button>
        </Box>

        {/* Category and Tags */}
        <Stack spacing={2}>
          <FormControl
            fullWidth
            error={!!validationErrors.category}
            required
          >
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Tags
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <TextField
                size="small"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                variant="outlined"
                onClick={handleAddTag}
                disabled={!newTag.trim()}
              >
                Add
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                />
              ))}
            </Stack>
          </Box>
        </Stack>

        <Divider />

        {/* Settings */}
        <Stack spacing={2}>
          <Typography variant="subtitle1">Settings</Typography>
          <Stack spacing={2}>
            <TextField
              type="datetime-local"
              label="End Time (Optional)"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
              }
              label="Anonymous Voting"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isAuthenticated}
                  onChange={(e) => setIsAuthenticated(e.target.checked)}
                />
              }
              label="Require Authentication"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isMultipleChoice}
                  onChange={(e) => setIsMultipleChoice(e.target.checked)}
                />
              }
              label="Allow Multiple Choice"
            />

            {isMultipleChoice && (
              <TextField
                type="number"
                label="Maximum Votes"
                value={maxVotes}
                onChange={(e) => setMaxVotes(e.target.value)}
                error={!!validationErrors.maxVotes}
                helperText={validationErrors.maxVotes}
                fullWidth
              />
            )}

            <TextField
              label="Custom Message (Optional)"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              multiline
              rows={2}
              fullWidth
            />
          </Stack>
        </Stack>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {poll ? 'Update Poll' : 'Create Poll'}
        </Button>
      </Stack>
    </Paper>
  );
};

export default PollForm; 