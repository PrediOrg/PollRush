import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import { useWallet } from '../contexts/WalletContext';

const PollCard = styled(Card)`
  margin-bottom: 20px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

interface Poll {
  id: number;
  title: string;
  options: string[];
  deadline: number;
  rewards: {
    token_type: string;
    reward_amount: number;
    reward_count: number;
  } | null;
  votes: number[];
  created_at: number;
}

const MyPolls: React.FC = () => {
  const [polls] = useState<Poll[]>([]);
  const { principal } = useWallet();

  useEffect(() => {
    const fetchMyPolls = async () => {
      if (!principal) return;
      
      try {
        // Call canister to get user's polls
        // const response = await pollCanister.get_my_polls(principal);
        // setPolls(response);
      } catch (error) {
        console.error('Failed to fetch polls:', error);
      }
    };

    fetchMyPolls();
  }, [principal]);

  if (!principal) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">
          Please connect your wallet to view your polls
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Polls
      </Typography>

      {polls.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            You haven't created any polls yet
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => window.location.href = '/create'}
          >
            Create Your First Poll
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {polls.map((poll) => (
            <Grid item xs={12} md={6} key={poll.id}>
              <PollCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {poll.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Created: {new Date(poll.created_at).toLocaleString()}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Deadline: {new Date(poll.deadline).toLocaleString()}
                  </Typography>
                  
                  {poll.rewards && (
                    <Typography variant="body2" color="secondary" gutterBottom>
                      Reward: {poll.rewards.reward_amount} {poll.rewards.token_type}
                      (Top {poll.rewards.reward_count})
                    </Typography>
                  )}
                  
                  <Typography variant="body2" gutterBottom>
                    Total votes: {poll.votes.reduce((a, b) => a + b, 0)}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    {poll.options.map((option, index) => (
                      <Typography key={index} variant="body2" gutterBottom>
                        {option}: {poll.votes[index]} votes
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      onClick={() => window.location.href = `/poll/${poll.id}`}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        // Implement share functionality
                        navigator.clipboard.writeText(
                          `${window.location.origin}/poll/${poll.id}`
                        );
                        alert('Poll link copied to clipboard!');
                      }}
                    >
                      Share
                    </Button>
                  </Box>
                </CardContent>
              </PollCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyPolls; 