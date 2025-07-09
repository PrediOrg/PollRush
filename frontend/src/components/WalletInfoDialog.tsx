import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';

interface WalletInfoDialogProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  principalId: string;
  accountId: string;
}

const WalletInfoDialog: React.FC<WalletInfoDialogProps> = ({
  open,
  onClose,
  onLogout,
  principalId,
  accountId,
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Wallet Information</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Principal ID
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
              {principalId}
            </Typography>
            <Tooltip title="Copy Principal ID">
              <IconButton
                size="small"
                onClick={() => copyToClipboard(principalId)}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Account ID
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
              {accountId}
            </Typography>
            <Tooltip title="Copy Account ID">
              <IconButton
                size="small"
                onClick={() => copyToClipboard(accountId)}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          color="error"
          variant="outlined"
        >
          Logout
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WalletInfoDialog; 