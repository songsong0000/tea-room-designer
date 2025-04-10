import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8D6E63', // 温暖的棕色
      light: '#A1887F',
      dark: '#6D4C41',
    },
    secondary: {
      main: '#607D8B', // 蓝灰色
      light: '#78909C',
      dark: '#455A64',
    },
    background: {
      default: '#F9F5F1', // 淡米色
      paper: '#FFFFFF',
    },
    text: {
      primary: '#5D4037', // 深棕色
      secondary: '#795548', // 中棕色
    },
  },
  typography: {
    fontFamily: '"Noto Serif SC", "Ma Shan Zheng", "FangSong", "KaiTi", "SimSun", "Roboto", sans-serif',
    h2: {
      fontWeight: 400,
      letterSpacing: 1.5,
      fontFamily: '"Ma Shan Zheng", "Noto Serif SC", serif',
    },
    h4: {
      fontWeight: 400,
      letterSpacing: '0.05em',
      fontFamily: '"Ma Shan Zheng", "Noto Serif SC", serif',
      fontSize: '2rem',
      marginBottom: '1.5rem'
    },
    h5: {
      fontFamily: '"Noto Serif SC", serif',
      fontWeight: 400,
    },
    h6: {
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: '"FangSong", serif',
      lineHeight: 1.8
    },
    body1: {
      lineHeight: 1.8
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFCF5',
          borderRadius: 8,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 26px',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.07)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontFamily: '"Noto Serif SC", serif',
          minWidth: 120,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
