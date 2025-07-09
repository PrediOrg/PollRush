import React from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  Tooltip,
} from '@mui/material';

interface ProgressBarProps {
  value: number;
  total?: number;
  showPercentage?: boolean;
  showValue?: boolean;
  height?: number;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  tooltip?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  total = 100,
  showPercentage = true,
  showValue = false,
  height = 8,
  color = 'primary',
  tooltip,
}) => {
  const percentage = total === 0 ? 0 : Math.round((value / total) * 100);
  const formattedValue = value.toLocaleString();
  const formattedTotal = total.toLocaleString();

  const content = (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 0.5,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {showValue ? `${formattedValue} / ${formattedTotal}` : ''}
        </Typography>
        {showPercentage && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {percentage}%
          </Typography>
        )}
      </Box>

      <LinearProgress
        variant="determinate"
        value={percentage}
        color={color}
        sx={{
          height,
          borderRadius: height / 2,
          backgroundColor: 'action.hover',
          '& .MuiLinearProgress-bar': {
            borderRadius: height / 2,
          },
        }}
      />
    </Box>
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} arrow>
        {content}
      </Tooltip>
    );
  }

  return content;
}; 