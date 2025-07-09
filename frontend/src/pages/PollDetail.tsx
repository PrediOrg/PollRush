import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { useWallet } from '../contexts/WalletContext';

const PollCard = styled(Card)`
  max-width: 800px;
  margin: 20px auto;
`;

const OptionBox = styled(Box)`
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
`;

interface Poll {
  id: number;
  title: string;
  description: string;
  options: string[];
  deadline: number;
  rewards: {
    token_type: string;
    reward_amount: number;
    reward_count: number;
  } | null;
  votes: number[];
  voters: { [key: string]: number };
  created_at: number;
  creator: string;
}

const PollDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [poll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const { principal } = useWallet();

  useEffect(() => {
    const fetchPoll = async () => {
      if (!id) return;
      
      try {
        // Call canister to get poll details
        // const response = await pollCanister.get_poll(parseInt(id));
        // setPoll(response);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch poll details');
        setLoading(false);
      }
    };

    fetchPoll();
  }, [id]);

  const handleVote = async () => {
    if (!principal) {
      setSnackbar({
        open: true,
        message: 'Please connect your wallet to vote',
      });
      return;
    }

    if (!poll || !id) return;

    try {
      // Call canister to submit vote
      // await pollCanister.vote(parseInt(id), optionIndex);
      setSnackbar({
        open: true,
        message: 'Vote submitted successfully!',
      });
      // Refresh poll data
      // const updatedPoll = await pollCanister.get_poll(parseInt(id));
      // setPoll(updatedPoll);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to submit vote',
      });
    }
  };

  const getVotedOption = () => {
    if (!poll || !principal) return null;
    const optionIndex = poll.voters[principal];
    return optionIndex !== undefined ? poll.options[optionIndex] : null;
  };

  const calculatePercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return (votes / total) * 100;
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (error || !poll) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5" color="error">
          {error || 'Poll not found'}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  const totalVotes = poll.votes.reduce((a, b) => a + b, 0);
  const votedOption = getVotedOption();

  return (
    <Box sx={{ p: 3 }}>
      <PollCard>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {poll.title}
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            {poll.description}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Created by: {poll.creator}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created: {new Date(poll.created_at).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Deadline: {new Date(poll.deadline).toLocaleString()}
            </Typography>
          </Box>

          {poll.rewards && (
            <Alert severity="info" sx={{ mb: 2 }}>
              Reward: {poll.rewards.reward_amount} {poll.rewards.token_type}
              (Top {poll.rewards.reward_count})
            </Alert>
          )}

          <Typography variant="h6" gutterBottom>
            Options
          </Typography>

          {poll.options.map((option, index) => (
            <OptionBox
              key={index}
              onClick={() => handleVote()}
              sx={{
                backgroundColor: votedOption === option ? '#e3f2fd' : 'inherit',
              }}
            >
              <Typography variant="body1" gutterBottom>
                {option}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={calculatePercentage(poll.votes[index], totalVotes)}
                  sx={{ flexGrow: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {poll.votes[index]} votes
                  ({calculatePercentage(poll.votes[index], totalVotes).toFixed(1)}%)
                </Typography>
              </Box>
            </OptionBox>
          ))}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/poll/${poll.id}`
                );
                setSnackbar({
                  open: true,
                  message: 'Poll link copied to clipboard!',
                });
              }}
            >
              Share Poll
            </Button>
          </Box>
        </CardContent>
      </PollCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Box>
  );
};

export default PollDetail; 