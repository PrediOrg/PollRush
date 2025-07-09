import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  Flag as FlagIcon,
  Check as CheckIcon,
} from '@mui/icons-material';

interface Report {
  id: string;
  reason: string;
  details?: string;
  reporter: {
    id: string;
    name: string;
  };
  timestamp: Date;
  status: 'pending' | 'resolved' | 'dismissed';
}

interface PollModerationProps {
  reports: Report[];
  onResolveReport: (id: string, action: 'delete' | 'warn' | 'dismiss') => Promise<void>;
  error?: string;
}

const PollModeration: React.FC<PollModerationProps> = ({
  reports,
  onResolveReport,
  error,
}) => {
  const [selectedAction, setSelectedAction] = useState<'delete' | 'warn' | 'dismiss'>('warn');
  const [actionDetails, setActionDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResolve = async (reportId: string) => {
    setIsSubmitting(true);
    try {
      await onResolveReport(reportId, selectedAction);
      setActionDetails('');
    } catch (error) {
      console.error('Failed to resolve report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="h6" gutterBottom>
          Moderation
        </Typography>

        <List>
          {reports.map((report, index) => (
            <React.Fragment key={report.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <FlagIcon color="error" />
                      <Typography variant="subtitle2">
                        Reported by {report.reporter.name}
                      </Typography>
                    </Stack>
                  }
                  secondary={
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <strong>Reason:</strong> {report.reason}
                      </Typography>
                      {report.details && (
                        <Typography variant="body2">
                          <strong>Details:</strong> {report.details}
                        </Typography>
                      )}
                      <Typography variant="caption" color="text.secondary">
                        Reported {new Date(report.timestamp).toLocaleString()}
                      </Typography>
                    </Stack>
                  }
                />
                <ListItemSecondaryAction>
                  <Stack direction="row" spacing={1}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Action</InputLabel>
                      <Select
                        value={selectedAction}
                        onChange={(e) => setSelectedAction(e.target.value as 'delete' | 'warn' | 'dismiss')}
                        label="Action"
                        disabled={isSubmitting}
                      >
                        <MenuItem value="delete">Delete Poll</MenuItem>
                        <MenuItem value="warn">Warn Creator</MenuItem>
                        <MenuItem value="dismiss">Dismiss Report</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      size="small"
                      placeholder="Action details..."
                      value={actionDetails}
                      onChange={(e) => setActionDetails(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleResolve(report.id)}
                      disabled={isSubmitting || !actionDetails.trim()}
                      startIcon={<CheckIcon />}
                    >
                      Resolve
                    </Button>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItem>
              {index < reports.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {reports.length === 0 && (
          <Alert severity="success" icon={<CheckIcon />}>
            No reports to moderate
          </Alert>
        )}
      </Stack>
    </Box>
  );
};

export default PollModeration; 