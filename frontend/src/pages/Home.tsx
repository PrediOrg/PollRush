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
} from '@mui/material';
import { useWallet } from '../contexts/WalletContext';

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
  const { principal } = useWallet();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsVisible(true);
    // Fetch polls from the canister
    const fetchPolls = async () => {
      // const response = await pollCanister.get_polls(sortBy);
      // setPolls(response);
    };
    
    fetchPolls();
  }, [sortBy]);

  const handleVote = async (pollId: string) => {
    // Implementation
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #E3F2FD 100%)',
    }}>
      {/* 背景动画元素 */}
      {[...Array(isMobile ? 3 : isTablet ? 5 : 8)].map((_, index) => (
        <FloatingElement key={index} delay={index * 0.5} />
      ))}
      
      {/* 主要内容 */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, sm: 6, md: 8 } }}>
        <Fade in={isVisible} timeout={1000}>
          <Box textAlign="center" mb={{ xs: 4, sm: 6, md: 8 }}>
            <Typography 
              variant="h1" 
              className="gradient-text slide-in-up"
              sx={{ 
                mb: 2,
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                fontWeight: 800,
              }}
            >
              PollRush
            </Typography>
            <Slide direction="up" in={isVisible} timeout={1200}>
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 3,
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                  color: 'text.secondary',
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                创建和参与投票，让每个声音都被听见
              </Typography>
            </Slide>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
              <Button 
                variant="contained" 
                size={isMobile ? "medium" : "large"}
                className="hover-lift pulse-animation"
                sx={{ 
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                创建投票
              </Button>
              <Button 
                variant="outlined" 
                size={isMobile ? "medium" : "large"}
                className="hover-lift"
                sx={{ 
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                浏览投票
              </Button>
            </Box>
          </Box>
        </Fade>

        {/* 特色功能卡片 */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mb: { xs: 4, sm: 6, md: 8 } }}>
          {[
            { title: '去中心化投票', desc: '基于ICP区块链的安全投票系统', icon: '🔒' },
            { title: '实时结果', desc: '投票结果实时更新，透明公开', icon: '📊' },
            { title: '隐私保护', desc: '保护用户隐私的同时确保投票真实性', icon: '🛡️' },
            { title: '移动友好', desc: '完美适配各种设备和屏幕尺寸', icon: '📱' },
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
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, mb: 2 }}>
                      {feature.icon}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      className="gradient-text"
                      sx={{ 
                        mb: 1,
                        fontSize: { xs: '1.1rem', sm: '1.25rem' },
                        fontWeight: 600,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                    >
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* 热门投票区域 */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            className="gradient-text"
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            }}
          >
            热门投票
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 4, flexWrap: 'wrap' }}>
            <Chip 
              label="最新" 
              onClick={() => setSortBy('time')}
              variant={sortBy === 'time' ? 'filled' : 'outlined'}
              className="hover-lift"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            />
            <Chip 
              label="最热" 
              onClick={() => setSortBy('popularity')}
              variant={sortBy === 'popularity' ? 'filled' : 'outlined'}
              className="hover-lift"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            />
          </Box>
        </Box>

        {/* 投票列表占位符 */}
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Fade in={isVisible} timeout={1500 + index * 100}>
                <Card 
                  className="hover-lift glass-effect"
                  sx={{ 
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(5px)',
                  }}
                >
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                  >
                    投票卡片 #{item}
                  </Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;