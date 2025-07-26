import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#FE5056',
      light: '#FE9e59',
      dark: '#E63946',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#8b02ca',
      light: '#B347D9',
      dark: '#6A0299',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#00D4FF',
      light: '#4DE2FF',
      dark: '#0099CC',
    },
    success: {
      main: '#00E676',
      light: '#66FF9A',
      dark: '#00C853',
    },
    warning: {
      main: '#FFB74D',
      light: '#FFCC80',
      dark: '#FF8F00',
    },
    error: {
      main: '#FF5252',
      light: '#FF8A80',
      dark: '#D32F2F',
    },
    background: {
      default: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #E3F2FD 100%)',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Basel, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 800,
      background: 'linear-gradient(45deg, #FE9e59 0%, #FE5056 50%, #8b02ca 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      '@media (min-width:960px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      background: 'linear-gradient(90deg, #FE5056 0%, #8b02ca 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      '@media (min-width:600px)': {
        fontSize: '2.25rem',
      },
      '@media (min-width:960px)': {
        fontSize: '2.75rem',
      },
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      fontSize: '0.875rem',
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontWeight: 700,
          textTransform: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
          '@media (max-width:600px)': {
            padding: '10px 20px',
            fontSize: '0.875rem',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #FE9e59 0%, #FE5056 50%, #E63946 100%)',
          boxShadow: '0 4px 15px rgba(254, 80, 86, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FF8E49 0%, #FF4046 50%, #D63946 100%)',
            boxShadow: '0 6px 20px rgba(254, 80, 86, 0.6)',
            transform: 'translateY(-2px)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #8b02ca 0%, #B347D9 100%)',
          boxShadow: '0 4px 15px rgba(139, 2, 202, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7a02b3 0%, #A347C9 100%)',
            boxShadow: '0 6px 20px rgba(139, 2, 202, 0.6)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          border: '2px solid',
          borderImage: 'linear-gradient(45deg, #FE9e59, #FE5056, #8b02ca) 1',
          '&:hover': {
            background: 'linear-gradient(45deg, rgba(254, 158, 89, 0.1), rgba(254, 80, 86, 0.1), rgba(139, 2, 202, 0.1))',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #FE9e59 0%, #FE5056 50%, #8b02ca 100%)',
          },
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            '&::before': {
              height: '6px',
            },
          },
          '@media (max-width:600px)': {
            borderRadius: 12,
            '&:hover': {
              transform: 'translateY(-4px) scale(1.01)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #FE9e59 0%, #FE5056 50%, #8b02ca 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: 'none',
          '@media (max-width:600px)': {
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
          background: 'linear-gradient(45deg, #FE9e59 0%, #FE5056 100%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF8E49 0%, #FF4046 100%)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FE5056',
              borderWidth: '2px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#8b02ca',
              borderWidth: '2px',
              boxShadow: '0 0 0 3px rgba(139, 2, 202, 0.1)',
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

// 确保字体在不同设备上都能正确缩放
theme = responsiveFontSizes(theme, {
  breakpoints: ['sm', 'md', 'lg'],
  factor: 2,
});

export default theme;