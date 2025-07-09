import React, { useState } from 'react';
import {
  Typography,
  Button,
  Stack,
  Alert,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  FileDownload as FileDownloadIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
  Image as ImageIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useWallet } from '../contexts/WalletContext';

interface PollExportProps {
  onExport: (format: 'pdf' | 'csv' | 'image') => Promise<void>;
  onShare?: () => void;
  isLoading?: boolean;
  error?: string;
}

const PollExport: React.FC<PollExportProps> = ({
  onExport,
  onShare,
  isLoading = false,
  error,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { principal } = useWallet();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = async (format: 'pdf' | 'csv' | 'image') => {
    try {
      await onExport(format);
      handleClose();
    } catch (error) {
      console.error('Failed to export:', error);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Export Options
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={handleClick}
          disabled={isLoading}
        >
          Export
        </Button>

        {onShare && (
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={onShare}
            disabled={isLoading}
          >
            Share
          </Button>
        )}
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleExport('pdf')}>
          <ListItemIcon>
            <PdfIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export as PDF</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport('csv')}>
          <ListItemIcon>
            <CsvIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export as CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleExport('image')}>
          <ListItemIcon>
            <ImageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export as Image</ListItemText>
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export default PollExport; 