import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NoDataProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionPath?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const NoData: React.FC<NoDataProps> = ({
  title = 'No Data Found',
  message = 'There is no data to display at the moment.',
  actionText,
  actionPath,
  onAction,
  icon,
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (actionPath) {
      navigate(actionPath);
    } else if (onAction) {
      onAction();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center',
      }}
    >
      {icon && (
        <Box
          sx={{
            mb: 2,
            color: 'text.secondary',
            '& svg': {
              width: 64,
              height: 64,
            },
          }}
        >
          {icon}
        </Box>
      )}

      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 400,
          mb: 3,
        }}
      >
        {message}
      </Typography>

      {(actionText && (actionPath || onAction)) && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAction}
          size="large"
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default NoData; 