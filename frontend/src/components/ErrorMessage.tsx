import React from 'react';
import { Alert, Button, Box } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert
        severity="error"
        icon={<ErrorIcon />}
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage; 