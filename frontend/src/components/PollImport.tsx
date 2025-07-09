import React, { useState } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import { useWallet } from '../contexts/WalletContext';

interface PollImportProps {
  onImport: (data: {
    title: string;
    options: string[];
    deadline?: number;
  }) => Promise<void>;
}

const PollImport: React.FC<PollImportProps> = ({ onImport }) => {
  const { principal } = useWallet();
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (!data.title || !Array.isArray(data.options)) {
        throw new Error('Invalid poll data format');
      }

      await onImport({
        title: data.title,
        options: data.options,
        deadline: data.deadline
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import poll');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Import Poll
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        component="label"
        disabled={!principal}
      >
        Upload JSON File
        <input
          type="file"
          hidden
          accept=".json"
          onChange={handleFileUpload}
        />
      </Button>
    </Box>
  );
};

export default PollImport; 