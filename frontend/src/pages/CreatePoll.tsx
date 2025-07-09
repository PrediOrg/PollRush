import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Paper,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useWallet } from '../contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { HttpAgent } from '@dfinity/agent';
import { Actor } from '@dfinity/agent';
import { idlFactory as pollRushIdlFactory } from '../../../src/declarations/pollrush_backend/pollrush_backend.did';

interface Token {
  symbol: string;
  address: string;
  balance: number;
}

const MAX_OPTIONS = 20;
const MIN_OPTIONS = 2;

const CreatePoll: React.FC = () => {
  const navigate = useNavigate();
  const { principal, getTokens } = useWallet();
  const [title, setTitle] = useState('');
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [customTokenAddress, setCustomTokenAddress] = useState('');
  const [rewardCount, setRewardCount] = useState(1);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [endTime, setEndTime] = useState<Date | null>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); // Default 7 days
  const [options, setOptions] = useState(['', '']);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (principal) {
        const userTokens = await getTokens();
        setTokens(userTokens);
      }
    };
    fetchTokens();
  }, [principal, getTokens]);

  const handleAddOption = () => {
    if (options.length < MAX_OPTIONS) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > MIN_OPTIONS) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const validateTokenBalance = () => {
    if (!selectedToken && !customTokenAddress) {
      setError('Please select or enter a token');
      return false;
    }

    const token = selectedToken || {
      symbol: 'Custom',
      address: customTokenAddress,
      balance: 0,
    };

    const totalReward = rewardCount * rewardAmount;
    if (token.balance < totalReward) {
      setError(`Insufficient ${token.symbol} balance. Required: ${totalReward}, Available: ${token.balance}`);
      return false;
    }

    return true;
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError('Please enter a title');
      return false;
    }
    if (!validateTokenBalance()) {
      return false;
    }
    if (rewardCount < 1) {
      setError('Reward count must be at least 1');
      return false;
    }
    if (rewardAmount <= 0) {
      setError('Reward amount must be greater than 0');
      return false;
    }
    if (!endTime || endTime <= new Date()) {
      setError('Please select a valid end time');
      return false;
    }
    if (options.some(opt => !opt.trim())) {
      setError('All options must be filled');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const agent = new HttpAgent();
      if (process.env.DFX_NETWORK === 'local') {
        agent.fetchRootKey();
      }

      const pollRushCanisterId = process.env.POLLRUSH_CANISTER_ID;
      if (!pollRushCanisterId) {
        throw new Error('Poll rush canister ID not configured');
      }

      const pollRushActor = Actor.createActor(pollRushIdlFactory, {
        agent,
        canisterId: pollRushCanisterId,
      });

      const result = await pollRushActor.create_poll({
        title,
        token: selectedToken?.address || customTokenAddress,
        reward_count: rewardCount,
        reward_amount: rewardAmount,
        end_time: endTime?.getTime() ?? Date.now() + 24 * 60 * 60 * 1000, // Default to 24 hours from now if null
        options,
      });

      // Navigate to the poll list page
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create poll');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Create New Poll
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Token</InputLabel>
                <Select
                  value={selectedToken?.address || ''}
                  onChange={(e) => {
                    const token = tokens.find(t => t.address === e.target.value);
                    setSelectedToken(token || null);
                    setCustomTokenAddress('');
                  }}
                >
                  {tokens.map((token) => (
                    <MenuItem key={token.address} value={token.address}>
                      {token.symbol} ({token.balance})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Or Enter Token Address"
                value={customTokenAddress}
                onChange={(e) => {
                  setCustomTokenAddress(e.target.value);
                  setSelectedToken(null);
                }}
                disabled={!!selectedToken}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Number of Winners"
                value={rewardCount}
                onChange={(e) => setRewardCount(Math.max(1, parseInt(e.target.value) || 0))}
                inputProps={{ min: 1 }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Reward Amount per Winner"
                value={rewardAmount}
                onChange={(e) => setRewardAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                inputProps={{ min: 0, step: 0.000001 }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <DateTimePicker
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                minDateTime={new Date()}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Poll Options
              </Typography>
              {options.map((option, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                  />
                  {options.length > MIN_OPTIONS && (
                    <IconButton
                      onClick={() => handleRemoveOption(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              {options.length < MAX_OPTIONS && (
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddOption}
                  variant="outlined"
                >
                  Add Option
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Create Poll
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default CreatePoll; 