import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Typography,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useWallet } from '../contexts/WalletContext';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(90deg, #FE9e59 0%, #FE5056 100%);
  box-shadow: none;
  border-bottom: 2px solid #FAFAFA;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LogoLink = styled(RouterLink)`
  font-family: 'Basel, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
  margin-right: 40px;
`;

const NavLinks = styled(Box)`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
`;

const NavButton = styled(Button)`
  color: white !important;
  text-decoration: none;
  font-family: 'Basel, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  font-size: 1rem;
  font-weight: 700;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const WalletButton = styled(Button)`
  background: #8b02ca;
  color: white !important;
  font-family: 'Basel, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  font-size: 1rem;
  font-weight: 700;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  margin-left: 20px;
  
  &:hover {
    background: #7a02b3;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
`;

const ToolbarSpacer = styled.div`
  height: 64px;
  @media (max-width: 600px) {
    height: 56px;
  }
`;

interface NavbarProps {
  isConnected: boolean;
  principal: string | null;
  onConnect: () => void;
  onWalletClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isConnected,
  principal,
  onConnect,
  onWalletClick,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Create Poll', path: '/create' },
    { text: 'My Polls', path: '/my-polls' },
  ];

  const drawer = (
    <List sx={{ bgcolor: 'primary.main' }}>
      {menuItems.map((item) => (
        <ListItem
          button
          component={RouterLink}
          to={item.path}
          key={item.text}
          onClick={handleDrawerToggle}
          sx={{
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontFamily: 'Basel, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'white',
            }}
          />
        </ListItem>
      ))}
      <ListItem
        button
        onClick={() => {
          handleDrawerToggle();
          isConnected ? onWalletClick() : onConnect();
        }}
        sx={{
          '&:hover': {
            background: 'rgba(139, 2, 202, 0.1)',
          },
        }}
      >
        <ListItemText
          primary={isConnected ? `${principal?.slice(0, 6)}...${principal?.slice(-4)}` : 'Connect Wallet'}
          primaryTypographyProps={{
            fontFamily: 'Basel, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'white',
          }}
        />
      </ListItem>
    </List>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Poll Rush
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                component={RouterLink}
                to="/create"
                color="inherit"
              >
                Create Poll
              </Button>

              {isConnected ? (
                <Button
                  color="inherit"
                  startIcon={<AccountBalanceWalletIcon />}
                  onClick={onWalletClick}
                >
                  {principal}
                </Button>
              ) : (
                <Button
                  color="inherit"
                  startIcon={<AccountBalanceWalletIcon />}
                  onClick={onConnect}
                >
                  Connect Wallet
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            bgcolor: 'primary.main',
          },
        }}
      >
        {drawer}
      </Drawer>
      <ToolbarSpacer />
    </>
  );
};

export default Navbar; 