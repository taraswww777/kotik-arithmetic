import { createTheme, ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    primary: '#4CAF50',
    primaryDark: '#45a049',
    secondary: '#2196F3',
    error: '#f44336',
    warning: '#ff9800',
    success: '#8bc34a',
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: '"Comic Sans MS", "Chalkboard", sans-serif',
    html: {
      fontSize: '18px',
    },
    h1: {
      fontSize: '32px',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '28px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '20px',
    },
    button: {
      fontSize: '20px',
      padding: '16px 32px',
    },
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.1)',
    '0 4px 8px rgba(0,0,0,0.1)',
    '0 8px 16px rgba(0,0,0,0.1)',
  ],
});

export default theme;