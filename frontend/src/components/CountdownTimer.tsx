import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatTimeRemaining } from '../utils/helpers';

interface CountdownTimerProps {
  endTime?: number;
  onExpire?: () => void;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endTime,
  onExpire,
  showIcon = true,
  size = 'medium',
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!endTime) {
      setTimeRemaining('No end time set');
      return;
    }

    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = endTime - now;

      if (remaining <= 0) {
        setIsExpired(true);
        setTimeRemaining('Expired');
        if (onExpire) {
          onExpire();
        }
        return;
      }

      setTimeRemaining(formatTimeRemaining(remaining));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime, onExpire]);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          iconSize: 16,
          fontSize: '0.875rem',
        };
      case 'large':
        return {
          iconSize: 32,
          fontSize: '1.5rem',
        };
      default:
        return {
          iconSize: 24,
          fontSize: '1.25rem',
        };
    }
  };

  const { iconSize, fontSize } = getSizeStyles();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: isExpired ? 'error.main' : 'text.secondary',
      }}
    >
      {showIcon && (
        <AccessTimeIcon
          sx={{
            width: iconSize,
            height: iconSize,
          }}
        />
      )}

      <Tooltip title={isExpired ? 'Poll has ended' : 'Time remaining'}>
        <Typography
          variant="body1"
          component="span"
          sx={{
            fontSize,
            fontWeight: isExpired ? 600 : 500,
          }}
        >
          {timeRemaining}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default CountdownTimer; 