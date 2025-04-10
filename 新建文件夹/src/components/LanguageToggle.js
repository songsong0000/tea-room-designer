import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
      <Button 
        onClick={toggleLanguage}
        variant="outlined"
        size="small"
        sx={{ 
          borderRadius: 16, 
          px: 2, 
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }
        }}
      >
        <Typography variant="body2" fontWeight={500}>
          {language === 'zh' ? 'EN' : '中文'}
        </Typography>
      </Button>
    </Box>
  );
};

export default LanguageToggle;
