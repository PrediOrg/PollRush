import React from 'react';
import {
  Alert,
  Snackbar,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number;
}

interface NotificationBannerProps {
  notifications: Notification[];
  onClose: (id: string) => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  notifications,
  onClose,
}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          >
            <Snackbar
              open={true}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={{ position: 'static', mb: 1 }}
            >
              <Alert
                severity={notification.type}
                variant="filled"
                sx={{
                  minWidth: 300,
                  boxShadow: 3,
                  '& .MuiAlert-message': {
                    width: '100%',
                  },
                }}
                action={
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={() => onClose(notification.id)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              >
                {notification.title && (
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    {notification.title}
                  </Typography>
                )}
                <Typography variant="body2">
                  {notification.message}
                </Typography>
              </Alert>
            </Snackbar>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default NotificationBanner; 