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
 * @param {string} customPrompt - 用户自定义的描述
 * @param {object} params - 生成参数，如茶室类型、风格、大小等
 * @returns {Promise} - 返回生成的图像数据
 */
export const generateTeaRoomImage = async (customPrompt, params) => {
  try {
    // 1. 首先处理自定义描述，提取关键词并加强权重
    const processCustomPrompt = (prompt) => {
      if (!prompt) return '';
      
      // 分析自定义描述中的关键词
      const keywords = prompt.split(/[,，.。\s]+/).filter(Boolean);
      
      // 为关键词添加权重
      return keywords.map(keyword => `((${keyword}:1.5))`).join(', ');
    };

    // 2. 构建基础场景描述
    const basePrompt = `
      (masterpiece, best quality, ultra detailed, professional interior photography:1.2),
      (traditional Chinese tea room, interior design, architectural visualization:1.3),
      
      // 基础设置
      (${params.type || '中式'}茶室:1.4),
      (${params.style || ''}风格:1.3),
      (${params.size || ''}空间:1.2),
      (${params.materials || ''}材质:1.2),
      (${params.lighting || ''}照明:1.2),

      // 家具布置
      (furniture arrangement:1.3) {
        (${params.furniture?.table || ''}:1.4),
        (${params.furniture?.seating || ''}:1.4),
        (${params.furniture?.storage || ''}:1.3),
        (${params.furniture?.teawareStand || ''}:1.3)
      },

      // 茶具细节
      (tea set details:1.3) {
        (${params.teaware?.pot || ''}:1.4),
        (${params.teaware?.cups || ''}:1.4),
        (${params.teaware?.tray || ''}:1.3)
      },

      // 环境元素
      (environment:1.3) {
        (${params.landscape?.plants || ''}:1.4),
        (${params.landscape?.water || ''}:1.3),
        (${params.landscape?.lighting || ''}:1.3)
      }
    `.trim();

    // 3. 处理自定义描述并加强其权重
    const enhancedCustomPrompt = customPrompt ? `
      // 用户特定要求 (高优先级)
      (specific requirements:1.6) {
        ${processCustomPrompt(customPrompt)}
      }
    ` : '';

    // 4. 组合最终提示词，确保自定义描述获得足够权重
    const finalPrompt = `
      ${basePrompt}
      
      ${enhancedCustomPrompt}
      
      // 图像质量控制
      (high quality, detailed, sharp focus:1.2),
      (professional lighting, balanced composition:1.2)
      
      // 负面提示词
      Negative prompt: (low quality, blurry, distorted:1.5), (oversaturated, unrealistic:1.3), (bad composition, wrong perspective:1.4), (watermark, text, logo:1.5)
    `.trim().replace(/\s+/g, ' ');

    console.log("最终生成的提示词:", finalPrompt); // 用于调试

    // 5. 调整生成参数以增强控制
    const requestData = {
      model: "Kwai-Kolors/Kolors",
      prompt: finalPrompt,
      negative_prompt: "模糊, 失真, 扭曲, 低质量, 简笔画, 过度拥挤, 比例失调, 水印, 文字",
      image_size: "1024x1024",
      batch_size: 1,
      seed: Math.floor(Math.random() * 1000000000),
      num_inference_steps: 40, // 增加步数以提高质量
      guidance_scale: 9.0, // 提高引导系数以增强提示词的影响
      cfg_scale: 8.5, // 提高配置比例
      denoising_strength: 0.8 // 增加去噪强度
    };

    const response = await apiClient.post('/images/generations', requestData);
    return response.data;
  } catch (error) {
    console.error('生成图像失败:', error);
    throw error;
  }
};

export default {
  generateTeaRoomImage
}; 