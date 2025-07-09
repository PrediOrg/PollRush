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
            color="primary"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <TelegramIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <GitHubIcon />
          </IconButton>
        </SocialLinks>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '0.7rem',
          }}
        >
          © 2025 PollRush
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer; 