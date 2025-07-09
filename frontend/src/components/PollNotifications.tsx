import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Alert,
  Tooltip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  NotificationsActive as NotificationsActiveIcon,
  NotificationsOff as NotificationsOffIcon,
  Email as EmailIcon,
  PushPin as PushPinIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Poll } from '../types';

interface Notification {
  id: string;
  type: 'email' | 'push' | 'in-app';
  event: 'poll_start' | 'poll_end' | 'new_comment' | 'new_vote' | 'reward_available';
  isEnabled: boolean;
  lastSent?: Date;
}

interface PollNotificationsProps {
  poll: Poll;
  notifications: Notification[];
  onUpdateNotifications?: (notifications: Notification[]) => Promise<void>;
  onDeleteNotification?: (notificationId: string) => Promise<void>;
}

const PollNotifications: React.FC<PollNotificationsProps> = ({
  poll,
  notifications,
  onUpdateNotifications,
  onDeleteNotification,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(notifications);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setLocalNotifications(notifications);
    setError(null);
  };

  const handleToggleNotification = (notificationId: string) => {
    setLocalNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isEnabled: !notification.isEnabled }
          : notification
      )
    );
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onUpdateNotifications?.(localNotifications);
      setIsOpen(false);
    } catch (err) {
      setError('Failed to update notifications. Please try again.');
      console.error('Failed to update notifications:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (notificationId: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await onDeleteNotification?.(notificationId);
      setLocalNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    } catch (err) {
      setError('Failed to delete notification. Please try again.');
      console.error('Failed to delete notification:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'email':
        return <EmailIcon />;
      case 'push':
        return <PushPinIcon />;
      case 'in-app':
        return <NotificationsIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getEventLabel = (event: Notification['event']) => {
    switch (event) {
      case 'poll_start':
        return 'Poll Start';
      case 'poll_end':
        return 'Poll End';
      case 'new_comment':
        return 'New Comment';
      case 'new_vote':
        return 'New Vote';
      case 'reward_available':
        return 'Reward Available';
      default:
        return event;
    }
  };

  const enabledNotifications = localNotifications.filter((n) => n.isEnabled);
  const disabledNotifications = localNotifications.filter((n) => !n.isEnabled);

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={handleOpen}>
          <NotificationsIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Poll Notifications</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                {poll.title}
              </Typography>
              {poll.description && (
                <Typography color="text.secondary" paragraph>
                  {poll.description}
                </Typography>
              )}
            </Box>

            <Divider />

            <Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  icon={<NotificationsActiveIcon />}
                  label={`${enabledNotifications.length} Active`}
                  color="primary"
                />
                <Chip
                  icon={<NotificationsOffIcon />}
                  label={`${disabledNotifications.length} Disabled`}
                  color="secondary"
                />
              </Stack>
            </Box>

            {enabledNotifications.length > 0 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Active Notifications
                </Typography>
                <List>
                  {enabledNotifications.map((notification) => (
                    <ListItem
                      key={notification.id}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemIcon>
                        {getNotificationIcon(notification.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={getEventLabel(notification.event)}
                        secondary={
                          <Stack spacing={0.5}>
                            <Typography variant="body2" color="text.secondary">
                              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)} Notification
                            </Typography>
                            {notification.lastSent && (
                              <Typography variant="caption" color="text.secondary">
                                Last sent: {notification.lastSent.toLocaleString()}
                              </Typography>
                            )}
                          </Stack>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Stack direction="row" spacing={1}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={notification.isEnabled}
                                onChange={() => handleToggleNotification(notification.id)}
                                disabled={isSubmitting}
                              />
                            }
                            label=""
                          />
                          <Tooltip title="Delete Notification">
                            <IconButton
                              edge="end"
                              onClick={() => handleDelete(notification.id)}
                              disabled={isSubmitting}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {disabledNotifications.length > 0 && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Disabled Notifications
                </Typography>
                <List>
                  {disabledNotifications.map((notification) => (
                    <ListItem
                      key={notification.id}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                        opacity: 0.7,
                      }}
                    >
                      <ListItemIcon>
                        {getNotificationIcon(notification.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={getEventLabel(notification.event)}
                        secondary={
                          <Stack spacing={0.5}>
                            <Typography variant="body2" color="text.secondary">
                              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)} Notification
                            </Typography>
                            {notification.lastSent && (
                              <Typography variant="caption" color="text.secondary">
                                Last sent: {notification.lastSent.toLocaleString()}
                              </Typography>
                            )}
                          </Stack>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Stack direction="row" spacing={1}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={notification.isEnabled}
                                onChange={() => handleToggleNotification(notification.id)}
                                disabled={isSubmitting}
                              />
                            }
                            label=""
                          />
                          <Tooltip title="Delete Notification">
                            <IconButton
                              edge="end"
                              onClick={() => handleDelete(notification.id)}
                              disabled={isSubmitting}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PollNotifications; 