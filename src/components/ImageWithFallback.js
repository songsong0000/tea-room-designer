import React, { useState } from 'react';
import { Box } from '@mui/material';
import { processImagePath } from '../utils/imageUtils';

const ImageWithFallback = ({ src, alt, fallbackImage, ...props }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    console.error(`图片加载失败: ${src}`);
    setError(true);
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  if (error) {
    return (
      <Box 
        sx={{ 
          width: '100%', 
          height: props.height || '200px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'rgba(0,0,0,0.1)',
          color: 'text.secondary'
        }}
      >
        图片加载失败
      </Box>
    );
  }

  return (
    <>
      {!loaded && (
        <Box 
          sx={{ 
            width: '100%', 
            height: props.height || '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.05)'
          }}
        >
          加载中...
        </Box>
      )}
      <img
        src={processImagePath(src)}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{ display: loaded ? 'block' : 'none' }}
        {...props}
      />
    </>
  );
};

export default ImageWithFallback;
