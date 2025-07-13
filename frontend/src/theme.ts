import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#FE5056',
      light: '#FE9e59',
    },
    secondary: {
      main: '#8b02ca',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FAFAFA',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Basel, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    body1: {
      fontSize: '0.875rem',
      '@media (min-width:600px)': {
        fontSize: '1rem',
      },
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
    navLink: {
      fontWeight: 700,
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 700,
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #FE9e59 0%, #FE5056 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #FE8e49 0%, #FE4046 100%)',
          },
        },
        containedSecondary: {
          backgroundColor: '#8b02ca',
          '&:hover': {
            backgroundColor: '#7a02b3',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          border: '1px solid #FAFAFA',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #FE9e59 0%, #FE5056 100%)',
          boxShadow: 'none',
          borderBottom: '2px solid #FAFAFA',
        },
      },
    },
  },
});

// 确保字体在不同设备上都能正确缩放
theme = responsiveFontSizes(theme);

export default theme;