import React from 'react';
import { Box } from '@mui/material';

const TeaDecoration = ({ type = 'teapot', position = 'topRight', size = 100 }) => {
  const getImagePath = () => {
    switch(type) {
      case 'teapot': return '/images/teapot-silhouette.png';
      case 'cup': return '/images/teacup-silhouette.png';
      case 'bowl': return '/images/teabowl-silhouette.png';
      default: return '/images/teapot-silhouette.png';
    }
  };

  const getPosition = () => {
    switch(position) {
      case 'topRight': return { top: 20, right: 20 };
      case 'topLeft': return { top: 20, left: 20 };
      case 'bottomRight': return { bottom: 20, right: 20 };
      case 'bottomLeft': return { bottom: 20, left: 20 };
      default: return { top: 20, right: 20 };
    }
  };

  return (
    <Box
      component="img"
      src={getImagePath()}
      alt="茶具装饰"
      sx={{
        position: 'absolute',
        width: size,
        height: 'auto',
        opacity: 0.2,
        ...getPosition(),
        zIndex: 0
      }}
    />
  );
};

export default TeaDecoration;
