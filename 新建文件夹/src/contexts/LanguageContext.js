import React, { createContext, useState, useContext } from 'react';

// 翻译内容
export const translations = {
  zh: {
    // 首页
    title: '大观茶境',
    subtitle: '古代茶室AI生成系统',
    introduction: '取法宋人林泉之志，智能生成四品茶境：幽居得静、禅修见性、雅集生趣、闲游适意。器与景谐，皆可随心而调。',
    startDesign: '开始设计',
    teaRoomTypes: '茶室类型',
    privateTeaSpace: '幽居式品茶空间',
    privateTeaSpaceDesc: '独处静思，与自然对话的私密空间',
    zenTeaSpace: '禅修式品茶空间',
    zenTeaSpaceDesc: '禅意浓厚，修身养性的冥想空间',
    elegantTeaSpace: '雅集式品茶空间',
    elegantTeaSpaceDesc: '文人雅士，品茶论道的社交空间',
    casualTeaSpace: '闲游式品茶空间',
    casualTeaSpaceDesc: '轻松惬意，休闲娱乐的开放空间',
    
    // 设计页面
    designTitle: '茶室设计',
    parameters: '设计参数',
    basicSettings: '基础设置',
    style: '风格',
    size: '大小',
    lighting: '光线',
    mainMaterial: '主材质',
    furniture: '家具',
    decoration: '陈设',
    teaTable: '茶桌',
    seating: '座椅',
    decorations: '装饰',
    storage: '储物柜',
    teaStand: '茶具架',
    teaSet: '茶具',
    teaPot: '茶壶',
    teaCup: '茶杯',
    teaTray: '茶盘',
    landscape: '景观',
    plants: '植物',
    waterscape: '水景',
    lightingType: '灯光',
    generate: '生成设计',
    reset: '重置',
    customDescription: '自定义描述',
    customDescHelper: '添加您对茶室的特殊要求或详细描述，帮助生成更符合您期望的效果图',
    customDescPlaceholder: '例如：我希望茶室有一面落地窗，可以看到外面的竹林，整体氛围宁静优雅...',
    generating: '生成中...',
    generateDesign: '生成设计方案',
    
    // 结果页面
    resultTitle: '您的茶室设计',
    designDetails: '设计详情',
    backToHome: '返回首页',
    backToDesign: '返回修改',
    regenerate: '重新生成',
    downloadImage: '下载效果图',
    saving: '保存中...',
    saved: '已保存',
    error: '发生错误',
    designParameters: '设计参数',
    noDesignData: '未找到设计数据，请返回设计页面重新生成',
  },
  en: {
    // Home page
    title: 'Grand Tea Realm',
    subtitle: 'Ancient Tea Room AI Generation System',
    introduction: 'Inspired by Song Dynasty\'s nature aesthetics, generating four types of tea spaces: Private Serenity, Zen Meditation, Elegant Gathering, and Casual Leisure. Utensils and scenery harmonize, all adjustable to your preference.',
    startDesign: 'Start Design',
    teaRoomTypes: 'Tea Room Types',
    privateTeaSpace: 'Private Tea Space',
    privateTeaSpaceDesc: 'A personal space for quiet contemplation',
    zenTeaSpace: 'Zen Tea Space',
    zenTeaSpaceDesc: 'A meditative space with zen aesthetics',
    elegantTeaSpace: 'Elegant Tea Space',
    elegantTeaSpaceDesc: 'A social space for tea enjoyment and discussions',
    casualTeaSpace: 'Casual Tea Space',
    casualTeaSpaceDesc: 'A relaxed and open space for casual tea enjoyment',
    
    // Designer page
    designTitle: 'Tea Room Design',
    parameters: 'Design Parameters',
    basicSettings: 'Basic Settings',
    style: 'Style',
    size: 'Size',
    lighting: 'Lighting',
    mainMaterial: 'Main Material',
    furniture: 'Furniture',
    decoration: 'Decoration',
    teaTable: 'Tea Table',
    seating: 'Seating',
    decorations: 'Decorations',
    storage: 'Storage Cabinet',
    teaStand: 'Tea Stand',
    teaSet: 'Tea Set',
    teaPot: 'Tea Pot',
    teaCup: 'Tea Cup',
    teaTray: 'Tea Tray',
    landscape: 'Landscape',
    plants: 'Plants',
    waterscape: 'Waterscape',
    lightingType: 'Lighting Type',
    generate: 'Generate Design',
    reset: 'Reset',
    customDescription: 'Custom Description',
    customDescHelper: 'Add your special requirements or detailed description to help generate the tea room design that meets your expectations',
    customDescPlaceholder: 'Example: I would like the tea room to have a floor-to-ceiling window with a view of bamboo forest, creating a peaceful and elegant atmosphere...',
    generating: 'Generating...',
    generateDesign: 'Generate Design',
    
    // Result page
    resultTitle: 'Your Tea Room Design',
    designDetails: 'Design Details',
    backToHome: 'Back to Home',
    backToDesign: 'Back to Design',
    regenerate: 'Regenerate',
    downloadImage: 'Download Image',
    saving: 'Saving...',
    saved: 'Saved',
    error: 'Error occurred',
    designParameters: 'Design Parameters',
    noDesignData: 'No design data found, please return to the design page and try again',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('zh'); // 默认为中文
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
