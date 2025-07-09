import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Grid,
  IconButton,
  Tooltip,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Poll } from '../types';
import { useWallet } from '../contexts/WalletContext';

interface PollAnalyticsProps {
  poll: Poll;
  onRefresh?: () => void;
  onExport?: () => void;
  onShare?: () => void;
  isLoading?: boolean;
  error?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`analytics-tabpanel-${index}`}
    aria-labelledby={`analytics-tab-${index}`}
    sx={{ py: 3 }}
  >
    {value === index && children}
  </Box>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const PollAnalytics: React.FC<PollAnalyticsProps> = ({
  poll,
  onRefresh,
  onExport,
  onShare,
  isLoading = false,
  error,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const { principal } = useWallet();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data - replace with actual data from your backend
  const timeSeriesData = [
    { time: '00:00', votes: 0 },
    { time: '04:00', votes: 5 },
    { time: '08:00', votes: 15 },
    { time: '12:00', votes: 30 },
    { time: '16:00', votes: 45 },
    { time: '20:00', votes: 60 },
  ];

  const optionData = [
    { name: 'Option 1', votes: 30 },
    { name: 'Option 2', votes: 20 },
    { name: 'Option 3', votes: 15 },
    { name: 'Option 4', votes: 10 },
    { name: 'Option 5', votes: 5 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 60 },
    { name: 'Mobile', value: 30 },
    { name: 'Tablet', value: 10 },
  ];

  const locationData = [
    { name: 'North America', value: 40 },
    { name: 'Europe', value: 30 },
    { name: 'Asia', value: 20 },
    { name: 'Others', value: 10 },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2">
            Poll Analytics
          </Typography>
          <Stack direction="row" spacing={1}>
            {onRefresh && (
              <Tooltip title="Refresh">
                <IconButton onClick={onRefresh} disabled={isLoading}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            )}
            {onExport && (
              <Tooltip title="Export">
                <IconButton onClick={onExport} disabled={isLoading}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            )}
            {onShare && (
              <Tooltip title="Share">
                <IconButton onClick={onShare} disabled={isLoading}>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3} component="div">
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <TrendingUpIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {poll.totalVotes}
              </Typography>
              <Typography color="text.secondary">Total Votes</Typography>
            </Paper>
          </Grid>
          <Grid xs={12} sm={6} md={3} component="div">
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {poll.uniqueVoters}
              </Typography>
              <Typography color="text.secondary">Unique Voters</Typography>
            </Paper>
          </Grid>
          <Grid xs={12} sm={6} md={3} component="div">
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <AccessTimeIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {poll.averageTimeSpent}m
              </Typography>
              <Typography color="text.secondary">Avg. Time Spent</Typography>
            </Paper>
          </Grid>
          <Grid xs={12} sm={6} md={3} component="div">
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <LocationIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" component="div" sx={{ mt: 1 }}>
                {poll.countries}
              </Typography>
              <Typography color="text.secondary">Countries</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Overview" />
            <Tab label="Votes" />
            <Tab label="Demographics" />
            <Tab label="Devices" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid xs={12} md={8} component="div">
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Voting Activity Over Time
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="votes"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            <Grid xs={12} md={4} component="div">
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Top Options
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={optionData}
                        dataKey="votes"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {optionData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Option Distribution
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={optionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="votes" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Geographic Distribution
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {locationData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Device Usage
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                    {deviceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </TabPanel>
      </Stack>
    </Paper>
  );
};

export default PollAnalytics; 