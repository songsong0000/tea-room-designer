import axios from 'axios';

// Silicon Flow API配置
const API_KEY = 'sk-ogpurysrqhgnweqmixmrhnktancvzxtumywpmzrcajstaswh';
const BASE_URL = 'https://api.siliconflow.cn/v1';

// 创建axios实例
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

/**
 * 调用图文生成API
 * @param {string} prompt - 描述想要生成的茶室场景的提示词
 * @param {object} params - 生成参数，如茶室类型、风格、大小等
 * @returns {Promise} - 返回生成的图像数据
 */
export const generateTeaRoomImage = async (prompt, params) => {
  try {
    // 构建更全面的提示词
    let teaRoomDescription = `一个精美的${params.type || '中式'}茶室，`;
    
    // 基础设置
    if (params.style) teaRoomDescription += `${params.style}风格，`;
    if (params.materials) teaRoomDescription += `主要使用${params.materials}，`;
    if (params.lighting) teaRoomDescription += `${params.lighting}，`;
    
    // 更详细的家具陈设
    if (params.furniture) teaRoomDescription += `家具包括${params.furniture}，`;
    
    // 添加茶具信息
    if (params.teaware) teaRoomDescription += `茶具为${params.teaware}，`;
    
    // 添加景观元素
    if (params.landscape) teaRoomDescription += `景观元素有${params.landscape}，`;
    
    // 添加自定义提示词
    const fullPrompt = `${teaRoomDescription}${prompt || ''}`.trim();
    
    console.log("发送的提示词:", fullPrompt); // 调试用
    
    // 按照官方示例构建请求参数
    const requestData = {
      model: "Kwai-Kolors/Kolors", // 使用官方示例中的模型
      prompt: fullPrompt,
      negative_prompt: "模糊, 失真, 扭曲, 低质量, 简笔画",
      image_size: "1024x1024",
      batch_size: 1,
      seed: Math.floor(Math.random() * 1000000000), // 随机种子
      num_inference_steps: 20,
      guidance_scale: 7.5
    };
    
    // 发送请求
    const response = await apiClient.post('/images/generations', requestData);
    
    return response.data;
  } catch (error) {
    console.error('生成图像失败:', error);
    console.error('错误详情:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  generateTeaRoomImage
}; 