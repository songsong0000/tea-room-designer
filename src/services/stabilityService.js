import axios from 'axios';

const API_KEY = process.env.REACT_APP_STABILITY_API_KEY;
const API_URL = 'http://localhost:3001/api/generate-image';

export const generateTeaRoomImage = async (params) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        text_prompts: [
          {
            text: generatePrompt(params),
            weight: 1.0
          }
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    
    return response.data.artifacts[0].base64; // 返回生成的图像（base64格式）
  } catch (error) {
    console.error('生成图像时出错：', error);
    throw error;
  }
};

// 根据用户的参数生成适合的提示词
const generatePrompt = (params) => {
  const { roomType, style, size, lighting, furniture, decoration, color } = params;
  
  let basePrompt = `高质量、逼真的中式${roomType}茶室内部空间，`;
  
  // 根据风格添加描述
  if (style === 'traditional') {
    basePrompt += '传统古典风格，';
  } else if (style === 'modern') {
    basePrompt += '现代简约风格，';
  } else if (style === 'zen') {
    basePrompt += '禅意风格，';
  }
  
  // 根据大小添加描述
  basePrompt += `${size}空间，`;
  
  // 光线描述
  basePrompt += `${lighting}光线，`;
  
  // 家具描述
  basePrompt += `配备${furniture}，`;
  
  // 装饰描述
  basePrompt += `${decoration}装饰，`;
  
  // 颜色描述
  basePrompt += `主色调为${color}，`;
  
  // 最终完善提示词
  basePrompt += '高清渲染，室内设计效果图，专业摄影，8k超高清';
  
  return basePrompt;
};
