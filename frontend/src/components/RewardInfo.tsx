import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Tooltip,
  Chip,
  Divider,
} from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { formatNumber } from '../utils/helpers';

interface RewardInfoProps {
  totalAmount: number;
  participantCount: number;
  rewardPerParticipant: number;
  isDistributed?: boolean;
  distributionTime?: number;
}

const RewardInfo: React.FC<RewardInfoProps> = ({
  totalAmount,
  participantCount,
  rewardPerParticipant,
  isDistributed = false,
  distributionTime,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.primary',
          }}
        >
          <TokenIcon color="primary" />
          Reward Information
        </Typography>

        {isDistributed && (
          <Chip
            icon={<EmojiEventsIcon />}
            label="Distributed"
            color="success"
            size="small"
          />
        )}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 2,
          mb: 2,
        }}
      >
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            Total Reward Pool
          </Typography>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              fontWeight: 600,
            }}
          >
            {formatNumber(totalAmount)} PPS
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            Participants
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.primary',
              fontWeight: 600,
            }}
          >
            {participantCount.toLocaleString()}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            Reward per Participant
          </Typography>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'success.main',
              fontWeight: 600,
            }}
          >
            {formatNumber(rewardPerParticipant)} PPS
          </Typography>
        </Box>
      </Box>

      {isDistributed && distributionTime && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 1,
            }}
          >
            Distributed on{' '}
            {new Date(distributionTime * 1000).toLocaleString()}
          </Typography>
        </>
      )}

      <Tooltip
        title="Rewards are automatically distributed to all participants after the poll ends"
        arrow
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 2,
            fontStyle: 'italic',
          }}
        >
          * Rewards are distributed automatically
        </Typography>
      </Tooltip>
    </Paper>
  );
};

export default RewardInfo; 