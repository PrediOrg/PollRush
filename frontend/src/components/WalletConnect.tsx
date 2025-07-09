import React from 'react';
import { Box, Button, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
} from '@mui/icons-material';
import { useWallet } from '../contexts/WalletContext';
import { formatPrincipal } from '../utils/helpers';

const WalletConnect: React.FC = () => {
  const { isConnected, principal, connect, disconnect } = useWallet();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      handleClose();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  if (!isConnected) {
    return (
      <Button
        variant="contained"
        color="primary"
        startIcon={<WalletIcon />}
        onClick={handleConnect}
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <Box>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<WalletIcon />}
        onClick={handleClick}
      >
        {principal ? formatPrincipal(principal) : 'Connected'}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Account"
            secondary={principal ? formatPrincipal(principal) : ''}
          />
        </MenuItem>
        <MenuItem onClick={handleDisconnect}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Disconnect" />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default WalletConnect; 