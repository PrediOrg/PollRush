import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExtensionIcon from '@mui/icons-material/Extension';

interface WalletSelectDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectWallet: (walletType: 'ii' | 'plug') => void;
}

const WalletSelectDialog: React.FC<WalletSelectDialogProps> = ({
  open,
  onClose,
  onSelectWallet,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Select Wallet</DialogTitle>
      <DialogContent>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onSelectWallet('ii')}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Internet Identity"
                secondary="Connect with Internet Identity"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onSelectWallet('plug')}>
              <ListItemIcon>
                <ExtensionIcon />
              </ListItemIcon>
              <ListItemText
                primary="Plug Wallet"
                secondary="Connect with Plug Wallet"
              />
            </ListItemButton>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default WalletSelectDialog; 