import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import { Poll } from '../types';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  role: 'creator' | 'voter' | 'commenter';
  timestamp: number;
}

interface PollParticipantsProps {
  participants: Participant[];
}

const PollParticipants: React.FC<PollParticipantsProps> = ({ participants }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Participants
      </Typography>

      <List>
        {participants.map((participant, index) => (
          <React.Fragment key={participant.id}>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem>
              <ListItemAvatar>
                <Avatar src={participant.avatar}>
                  {participant.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={participant.name}
                secondary={`${participant.role} • ${new Date(
                  participant.timestamp * 1000
                ).toLocaleDateString()}`}
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>

      {participants.length === 0 && (
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          <Typography>No participants yet</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PollParticipants; 