import React from 'react';
import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background: #FAFAFA;
  border-top: 2px solid #EEEEEE;
  padding: 2rem 0;
  margin-top: auto;
`;

const SocialLinks = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <SocialLinks>
          <IconButton
            component={Link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#FE5056' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#FE5056' }}
          >
            <TelegramIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#FE5056' }}
          >
            <GitHubIcon />
          </IconButton>
        </SocialLinks>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            fontFamily: 'Basel, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: '0.8rem',
          }}
        >
          © 2025 PollRush | Powered by Predi
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer;