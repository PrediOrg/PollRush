import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Fade,
} from '@mui/material';

interface LoadingOverlayProps {
  open: boolean;
  message?: string;
  fullScreen?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  open,
  message = 'Loading...',
  fullScreen = false,
}) => {
  if (!open) return null;

  return (
    <Fade in={open}>
      <Box
        sx={{
          position: fullScreen ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(4px)',
          zIndex: 1300,
          ...(fullScreen && {
            position: 'fixed',
          }),
        }}
      >
        <CircularProgress
          size={48}
          thickness={4}
          sx={{
            mb: 2,
            color: 'primary.main',
          }}
        />
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>
      </Box>
    </Fade>
  );
};

export default LoadingOverlay; 