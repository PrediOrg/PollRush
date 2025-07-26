import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Avatar,
  Stack,
} from '@mui/material';
import { useWallet } from '../contexts/WalletContext';
import { useNavigate } from 'react-router-dom';

interface Poll {
  id: string;
  title: string;
  description: string;
  options: string[];
  votes: number[];
  endTime: number;
  creator: string;
}

const FloatingElement: React.FC<{ delay: number }> = ({ delay }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;
        setPosition({ x: deltaX, y: deltaY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box
      ref={elementRef}
      sx={{
        position: 'absolute',
        width: { xs: 60, sm: 80, md: 100 },
        height: { xs: 60, sm: 80, md: 100 },
        background: 'linear-gradient(45deg, rgba(254, 158, 89, 0.3), rgba(254, 80, 86, 0.3), rgba(139, 2, 202, 0.3))',
        borderRadius: '50%',
        filter: 'blur(1px)',
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s ease',
        animation: `float ${4 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        zIndex: 0,
      }}
    />
  );
};

const Home: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [sortBy, setSortBy] = useState<'time' | 'popularity'>('time');
  const [isVisible, setIsVisible] = useState(false);
  const { principal, isConnected } = useWallet();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    // Fetch polls from the canister
    const fetchPolls = async () => {
      // const response = await pollCanister.get_polls(sortBy);
      // setPolls(response);
    };
    
    fetchPolls();
  }, [sortBy]);

  const handleCreatePoll = () => {
    if (isConnected) {
      navigate('/create');
    } else {
      // Prompt user to connect wallet first
      alert('Please connect your wallet first');
    }
  };

  const handleBrowsePolls = () => {
    navigate('/my-polls');
  };

  // Example poll data
  const examplePolls = [
    {
      id: '1',
      title: 'What is your favorite programming language?',
      description: 'Choose the programming language you use most frequently and enjoy working with in daily development',
      options: ['JavaScript', 'Python', 'Rust', 'Go'],
      votes: [45, 32, 28, 15],
      endTime: Date.now() + 86400000, // 24 hours later
      creator: 'developer123'
    },
    {
      id: '2', 
      title: 'Future of Blockchain Technology',
      description: 'What do you think will be the most promising application area for blockchain technology in the next 5 years?',
      options: ['DeFi Finance', 'NFT Art', 'Web3 Social', 'Supply Chain'],
      votes: [67, 23, 34, 19],
      endTime: Date.now() + 172800000, // 48 hours later
      creator: 'blockchain_expert'
    },
    {
      id: '3',
      title: 'Remote Work vs Office Work',
      description: 'After the pandemic, which work mode do you prefer?',
      options: ['Fully Remote', 'Hybrid Mode', 'Fully Office', 'Depends on Situation'],
      votes: [89, 156, 23, 67],
      endTime: Date.now() + 259200000, // 72 hours later
      creator: 'hr_manager'
    }
  ];

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #E3F2FD 100%)',
    }}>
      {/* Background animation elements */}
      {[...Array(isMobile ? 3 : isTablet ? 5 : 8)].map((_, index) => (
        <FloatingElement key={index} delay={index * 0.5} />
      ))}
      
      {/* Main content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, sm: 6, md: 8 } }}>
        {/* Product title and slogan */}
        <Fade in={isVisible} timeout={1000}>
          <Box textAlign="center" mb={{ xs: 4, sm: 6, md: 8 }}>
            <Typography 
              variant="h1" 
              className="gradient-text slide-in-up"
              sx={{ 
                mb: 2,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 800,
              }}
            >
              PollRush
            </Typography>
            
            <Slide direction="up" in={isVisible} timeout={1200}>
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                Make Every Voice Heard, Make Every Choice Matter
              </Typography>
            </Slide>
            
            {/* Brand information */}
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Powered by
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #FE9e59 0%, #FE5056 50%, #8b02ca 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Predi
              </Typography>
            </Stack>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
              <Button 
                variant="contained" 
                size={isMobile ? "medium" : "large"}
                className="hover-lift pulse-animation"
                onClick={handleCreatePoll}
                sx={{ 
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                🚀 Create Poll
              </Button>
              <Button 
                variant="outlined" 
                size={isMobile ? "medium" : "large"}
                className="hover-lift"
                onClick={handleBrowsePolls}
                sx={{ 
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                📊 Browse Polls
              </Button>
            </Box>
          </Box>
        </Fade>

        {/* Product features */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: { xs: 6, sm: 8, md: 10 } }}>
          {[
            { 
              title: '🔒 Decentralized Security', 
              desc: 'Built on ICP blockchain technology, ensuring tamper-proof voting data with transparent and public results', 
              icon: '🔒',
              color: '#FE5056'
            },
            { 
              title: '⚡ Real-time Analytics', 
              desc: 'Live voting results with multiple chart displays and clear data visualization for instant insights', 
              icon: '📊',
              color: '#8b02ca'
            },
            { 
              title: '🛡️ Privacy Protection', 
              desc: 'Advanced encryption technology protects user privacy while ensuring voting authenticity and integrity', 
              icon: '🛡️',
              color: '#00D4FF'
            },
            { 
              title: '📱 Multi-platform Support', 
              desc: 'Perfect compatibility across desktop, tablet, and mobile devices for voting anytime, anywhere', 
              icon: '📱',
              color: '#00E676'
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={isVisible} timeout={1000 + index * 200}>
                <Card 
                  className="hover-lift fade-in-scale glass-effect"
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    p: { xs: 2, sm: 3 },
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${feature.color}20`,
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, mb: 2 }}>
                      {feature.icon}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' },
                        fontWeight: 600,
                        color: feature.color,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, lineHeight: 1.6 }}
                    >
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Example polls section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            className="gradient-text"
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            }}
          >
            🔥 Trending Poll Examples
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            See what topics other users are discussing, join the conversation, and make your voice heard!
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 4, flexWrap: 'wrap' }}>
            <Chip 
              label="🕒 Latest" 
              onClick={() => setSortBy('time')}
              variant={sortBy === 'time' ? 'filled' : 'outlined'}
              className="hover-lift"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            />
            <Chip 
              label="🔥 Popular" 
              onClick={() => setSortBy('popularity')}
              variant={sortBy === 'popularity' ? 'filled' : 'outlined'}
              className="hover-lift"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            />
          </Box>
        </Box>

        {/* Example poll list */}
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {examplePolls.map((poll, index) => {
            const totalVotes = poll.votes.reduce((sum, vote) => sum + vote, 0);
            const timeLeft = Math.max(0, poll.endTime - Date.now());
            const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
            
            return (
              <Grid item xs={12} sm={6} md={4} key={poll.id}>
                <Fade in={isVisible} timeout={1500 + index * 100}>
                  <Card 
                    className="hover-lift glass-effect"
                    sx={{ 
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(5px)',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/poll/${poll.id}`)}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 2,
                          fontWeight: 600,
                          fontSize: { xs: '1rem', sm: '1.1rem' },
                          lineHeight: 1.3,
                        }}
                      >
                        {poll.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 3, lineHeight: 1.5 }}
                      >
                        {poll.description}
                      </Typography>
                      
                      <Box sx={{ mb: 3 }}>
                        {poll.options.slice(0, 2).map((option, optIndex) => {
                          const percentage = totalVotes > 0 ? (poll.votes[optIndex] / totalVotes * 100) : 0;
                          return (
                            <Box key={optIndex} sx={{ mb: 1 }}>
                              <Box sx={{ 
                                height: 6, 
                                bgcolor: 'grey.200', 
                                borderRadius: 3,
                                overflow: 'hidden'
                              }}
                              >
                                <Box 
                                  sx={{ 
                                    height: '100%', 
                                    width: `${percentage}%`,
                                    background: `linear-gradient(90deg, #FE9e59, #FE5056)`,
                                    transition: 'width 0.3s ease'
                                  }} 
                                />
                              </Box>
                            </Box>
                          );
                        })}
                        {poll.options.length > 2 && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.8rem' }}>
                            +{poll.options.length - 2} more options
                          </Typography>
                        )}
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          💬 {totalVotes} votes
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                          ⏰ {hoursLeft}h left
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
        
        {/* Bottom CTA section */}
        <Box sx={{ textAlign: 'center', mt: { xs: 6, sm: 8, md: 10 }, mb: 4 }}>
          <Typography 
            variant="h4" 
            className="gradient-text"
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.2rem' },
            }}
          >
            🎯 Ready to Create Your Poll?
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}
          >
            Join the PollRush community, create your own polls, and engage more people in decision-making!
          </Typography>
          
          <Button 
            variant="contained" 
            size="large"
            className="hover-lift glow-effect"
            onClick={handleCreatePoll}
            sx={{ 
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 700,
            }}
          >
            🚀 Start Creating Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;