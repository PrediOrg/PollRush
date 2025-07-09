import React from 'react';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Stack,
} from '@mui/material';
import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';

interface PollOptionProps {
  text: string;
  votes: number;
  totalVotes: number;
  isSelected?: boolean;
  onVote?: () => void;
  disabled?: boolean;
}

const PollOption: React.FC<PollOptionProps> = ({
  text,
  votes,
  totalVotes,
  isSelected = false,
  onVote,
  disabled = false,
}) => {
  const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: isSelected ? 'primary.main' : 'divider',
        borderRadius: 1,
        bgcolor: isSelected ? 'action.selected' : 'background.paper',
      }}
    >
      <Stack spacing={1}>
        <Typography variant="body1">{text}</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{ flexGrow: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {votes} votes ({percentage.toFixed(1)}%)
          </Typography>
        </Box>

        {onVote && (
          <Button
            variant={isSelected ? 'contained' : 'outlined'}
            startIcon={<ThumbUpIcon />}
            onClick={onVote}
            disabled={disabled}
            fullWidth
          >
            {isSelected ? 'Voted' : 'Vote'}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default PollOption; 