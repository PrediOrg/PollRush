import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Stack,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  ContentCopy as ContentCopyIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';

interface PollEmbedProps {
  embedUrl: string;
}

const PollEmbed: React.FC<PollEmbedProps> = ({ embedUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleOpen = () => {
    window.open(embedUrl, '_blank');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Embed Poll
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          value={embedUrl}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Stack direction="row" spacing={1}>
                <Tooltip title="Copy">
                  <IconButton onClick={handleCopy}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Open in new tab">
                  <IconButton onClick={handleOpen}>
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            ),
          }}
        />

        {copied && (
          <Alert severity="success" onClose={() => setCopied(false)}>
            Copied to clipboard!
          </Alert>
        )}

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Preview:
          </Typography>
          <Box
            component="iframe"
            src={embedUrl}
            sx={{
              width: '100%',
              height: 400,
              border: '1px solid #ccc',
              borderRadius: 1,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default PollEmbed; 