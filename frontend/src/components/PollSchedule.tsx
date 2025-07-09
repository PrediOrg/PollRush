import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  Stack,
  CircularProgress,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Poll } from '../types';

interface PollScheduleProps {
  poll: Poll;
  onSchedule: (date: Date) => Promise<void>;
  isSubmitting?: boolean;
  error?: string;
}

const PollSchedule: React.FC<PollScheduleProps> = ({
  onSchedule,
  isSubmitting = false,
  error,
}) => {
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  const handleSchedule = async () => {
    if (!scheduledDate) return;

    try {
      await onSchedule(scheduledDate);
    } catch (error) {
      console.error('Failed to schedule poll:', error);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="h6" gutterBottom>
          Schedule Poll
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Schedule Date"
            value={scheduledDate}
            onChange={(newValue: Date | null) => setScheduledDate(newValue)}
            minDateTime={new Date()}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={handleSchedule}
          disabled={isSubmitting || !scheduledDate}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? 'Scheduling...' : 'Schedule'}
        </Button>
      </Stack>
    </Box>
  );
};

export default PollSchedule; 