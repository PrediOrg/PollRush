import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useWallet } from '../contexts/WalletContext';

interface Template {
  id: string;
  title: string;
  description?: string;
  options: string[];
  createdAt: number;
}

interface PollTemplatesProps {
  templates: Template[];
  onUseTemplate: (templateId: string) => void;
  onDeleteTemplate: (templateId: string) => Promise<void>;
  isSubmitting?: boolean;
}

const PollTemplates: React.FC<PollTemplatesProps> = ({
  templates,
  onUseTemplate,
  onDeleteTemplate,
  isSubmitting = false,
}) => {
  const { principal } = useWallet();

  const handleDelete = async (templateId: string) => {
    try {
      await onDeleteTemplate(templateId);
    } catch (error) {
      console.error('Failed to delete template:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Templates
      </Typography>

      <List>
        {templates.map((template) => (
          <ListItem
            key={template.id}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 1,
            }}
          >
            <ListItemText
              primary={template.title}
              secondary={
                <>
                  {template.description && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {template.description}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary">
                    {template.options.length} options • Created{' '}
                    {new Date(template.createdAt * 1000).toLocaleDateString()}
                  </Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  onClick={() => onUseTemplate(template.id)}
                  disabled={isSubmitting}
                >
                  Use
                </Button>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(template.id)}
                  disabled={isSubmitting}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {templates.length === 0 && (
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          <Typography>No templates yet</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PollTemplates; 