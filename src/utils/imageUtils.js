// src/utils/imageUtils.js

// 处理图片路径
export const processImagePath = (path) => {
  const encodedPath = path.split('/').map(segment => 
    segment.includes('.') ? encodeURIComponent(segment) : segment
  ).join('/');
  return `${process.env.PUBLIC_URL}${encodedPath}`;
};

// 预加载图片
export const preloadImages = (imagePaths) => {
  imagePaths.forEach(path => {
    const img = new Image();
    img.src = processImagePath(path);
  });
};

// 图片加载错误处理
export const handleImageError = (event, fallbackImage) => {
  console.error(`图片加载失败: ${event.target.src}`);
  if (fallbackImage) {
    event.target.src = fallbackImage;
  }
};
