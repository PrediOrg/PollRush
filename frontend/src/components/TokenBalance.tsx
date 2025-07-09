import React from 'react';
import {
  Box,
  Typography,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';
import { useWallet } from '../contexts/WalletContext';
import { formatNumber } from '../utils/helpers';

interface TokenBalanceProps {
  balance: number;
  isLoading?: boolean;
  showIcon?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const TokenBalance: React.FC<TokenBalanceProps> = ({
  balance,
  isLoading = false,
  showIcon = true,
  size = 'medium',
}) => {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return null;
  }

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
      }}
    >
      {showIcon && (
        <TokenIcon
          sx={{
            width: iconSize,
            height: iconSize,
            color: 'primary.main',
          }}
        />
      )}

      {isLoading ? (
        <CircularProgress size={iconSize} />
      ) : (
        <Tooltip title={`${balance.toLocaleString()} PPS`}>
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontSize,
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {formatNumber(balance)} PPS
          </Typography>
        </Tooltip>
      )}
    </Box>
  );
};

export default TokenBalance; 