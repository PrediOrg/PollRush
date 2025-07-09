import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Poll } from '../types';
import { useWallet } from '../contexts/WalletContext';

interface Collection {
  id: string;
  name: string;
  description?: string;
}

interface PollBookmarkProps {
  collections: Collection[];
  onAddToCollection: (collectionId: string) => Promise<void>;
  isSubmitting?: boolean;
  error?: string;
}

const PollBookmark: React.FC<PollBookmarkProps> = ({
  collections,
  onAddToCollection,
  isSubmitting = false,
  error,
}) => {
  const { principal } = useWallet();

  const handleAddToCollection = async (collectionId: string) => {
    try {
      await onAddToCollection(collectionId);
    } catch (error) {
      console.error('Failed to add to collection:', error);
    }
  };

  return (
    <Box>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="h6" gutterBottom>
          Collections
        </Typography>

        <Stack spacing={1}>
          {collections.map((collection) => (
            <Button
              key={collection.id}
              variant="outlined"
              onClick={() => handleAddToCollection(collection.id)}
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {collection.name}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default PollBookmark; 