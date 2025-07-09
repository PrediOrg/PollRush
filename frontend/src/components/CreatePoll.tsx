import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Stack,
  Chip,
  FormControlLabel,
  Switch,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Poll } from '../types';

interface CreatePollProps {
  onSubmit: (poll: Omit<Poll, 'id' | 'createdAt' | 'creator'>) => void;
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
}

const CreatePoll: React.FC<CreatePollProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [maxVotes, setMaxVotes] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || options.some((opt) => !opt)) {
      return;
    }

    onSubmit({
      title,
      description,
      options: options.map((text) => ({
        id: Math.random().toString(36).substr(2, 9),
        text,
        votes: 0,
      })),
      category,
      tags,
      isMultipleChoice,
      maxVotes,
      isAnonymous,
      isPrivate,
      endTime: endTime ? Math.floor(endTime.getTime() / 1000) : undefined,
      votes: [],
      status: 'active',
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create New Poll
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              multiline
              rows={3}
            />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Options
              </Typography>
              {options.map((option, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    fullWidth
                    placeholder={`Option ${index + 1}`}
                  />
                  {options.length > 2 && (
                    <IconButton
                      onClick={() => handleRemoveOption(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddOption}
                sx={{ mt: 1 }}
              >
                Add Option
              </Button>
            </Box>

            <TextField
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  fullWidth
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button onClick={handleAddTag}>Add</Button>
              </Box>
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

            <FormControlLabel
              control={
                <Switch
                  checked={isMultipleChoice}
                  onChange={(e) => setIsMultipleChoice(e.target.checked)}
                />
              }
              label="Allow multiple choice"
            />

            {isMultipleChoice && (
              <TextField
                type="number"
                label="Maximum votes per user"
                value={maxVotes}
                onChange={(e) => setMaxVotes(Number(e.target.value))}
                inputProps={{ min: 1 }}
                fullWidth
              />
            )}

            <FormControlLabel
              control={
                <Switch
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
              }
              label="Anonymous poll"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
              }
              label="Private poll"
            />

            <TextField
              type="datetime-local"
              label="End time (optional)"
              value={endTime ? endTime.toISOString().slice(0, 16) : ''}
              onChange={(e) => {
                const value = e.target.value;
                setEndTime(value ? new Date(value) : null);
              }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Create Poll
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePoll; 