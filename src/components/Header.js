import React from 'react';
import { AppBar, Toolbar, Typography, Box, useScrollTrigger } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getImagePath } from '../utils/pathUtils';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger ? 'rgba(244, 241, 234, 0.95)' : 'transparent',
      backdropFilter: trigger ? 'blur(8px)' : 'none',
      transition: 'all 0.3s ease-in-out',
    },
  });
}

function Header() {
  const navigate = useNavigate();

  return (
    <ElevationScroll>
      <AppBar position="sticky" color="transparent">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer' 
            }}
            onClick={() => navigate('/')}
          >
            <Box 
              component="img" 
              src={getImagePath('teapot-silhouette.png')} 
              alt="茶室设计" 
              sx={{ 
                height: 40, 
                mr: 2, 
                opacity: 0.8 
              }} 
            />
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Ma Shan Zheng", serif', 
                color: 'primary.main',
                fontSize: {xs: '1.5rem', md: '1.8rem'} 
              }}
            >
              一期一会 · 雅室
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                cursor: 'pointer', 
                color: 'text.primary',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: 0,
                  height: 2,
                  backgroundColor: 'primary.main',
                  transition: 'width 0.3s',
                },
                '&:hover:after': {
                  width: '100%',
                },
              }}
              onClick={() => navigate('/')}
            >
              品茶空间
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                cursor: 'pointer', 
                color: 'text.primary',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: 0,
                  height: 2,
                  backgroundColor: 'primary.main',
                  transition: 'width 0.3s',
                },
                '&:hover:after': {
                  width: '100%',
                },
              }}
              onClick={() => navigate('/designer')}
            >
              设计方案
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}

export default Header;