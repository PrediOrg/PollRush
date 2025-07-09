import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { WalletProvider, useWallet } from './contexts/WalletContext';
import WalletSelectDialog from './components/WalletSelectDialog';
import WalletInfoDialog from './components/WalletInfoDialog';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreatePoll from './pages/CreatePoll';
import MyPolls from './pages/MyPolls';
import MyAttendance from './pages/MyAttendance';
import PollDetail from './pages/PollDetail';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const AppContent: React.FC = () => {
  const { isConnected, principal, accountId, connect, disconnect } = useWallet();
  const [walletSelectOpen, setWalletSelectOpen] = useState(false);
  const [walletInfoOpen, setWalletInfoOpen] = useState(false);

  const handleConnect = () => {
    setWalletSelectOpen(true);
  };

  const handleSelectWallet = async (walletType: 'ii' | 'plug') => {
    setWalletSelectOpen(false);
    if (walletType === 'ii') {
      await connect();
    } else if (walletType === 'plug') {
      // Plug wallet connection is handled in WalletContext
      await connect();
    }
  };

  const formatPrincipal = (principal: string) => {
    if (!principal) return '';
    return `${principal.slice(0, 6)}...${principal.slice(-4)}`;
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WalletProvider>
          <Navbar
            isConnected={isConnected}
            principal={principal ? formatPrincipal(principal) : null}
            onConnect={handleConnect}
            onWalletClick={() => setWalletInfoOpen(true)}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePoll />} />
            <Route path="/my-polls" element={<MyPolls />} />
            <Route path="/my-attendance" element={<MyAttendance />} />
            <Route path="/poll/:id" element={<PollDetail />} />
          </Routes>
          <Footer />
        </WalletProvider>
      </ThemeProvider>

      <WalletSelectDialog
        open={walletSelectOpen}
        onClose={() => setWalletSelectOpen(false)}
        onSelectWallet={handleSelectWallet}
      />

      <WalletInfoDialog
        open={walletInfoOpen}
        onClose={() => setWalletInfoOpen(false)}
        onLogout={disconnect}
        principalId={principal || ''}
        accountId={accountId || ''}
      />
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WalletProvider>
        <AppContent />
      </WalletProvider>
    </ThemeProvider>
  );
};

export default App; 