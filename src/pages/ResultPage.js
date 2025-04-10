import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Alert,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getImagePath } from '../utils/pathUtils';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 从location中获取传递过来的数据
  const { parameters = {}, selectedType = '', generatedImage = '', prompt = '' } = location.state || {};

  // 添加语言支持
  const { t, language } = useLanguage();

  // 根据参数生成描述文本
  const generateDescription = () => {
    const baseType = selectedType || '茶室';
    const style = parameters.基础设置?.风格 || '';
    const size = parameters.基础设置?.大小 || '';
    const material = parameters.基础设置?.主材质 || '';
    
    let description = `${baseType}`;
    if (style) description += `，${style}风格`;
    if (size) description += `，${size}`;
    if (material) description += `，主要采用${material}`;
    
    // 添加更多选定的参数
    const details = [];
    if (parameters.陈设?.茶桌) details.push(`茶桌：${parameters.陈设.茶桌}`);
    if (parameters.陈设?.座椅) details.push(`座椅：${parameters.陈设.座椅}`);
    if (parameters.景观?.植物) details.push(`植物装饰：${parameters.景观.植物}`);
    if (parameters.景观?.灯光) details.push(`灯光：${parameters.景观.灯光}`);
    
    return {
      mainDescription: description,
      details: details
    };
  };
  
  const descriptionData = generateDescription();

  // 获取更详细的茶室类型描述
  const getTeaRoomFeatures = () => {
    switch(selectedType) {
      case '幽居式品茶空间':
        return {
          title: '幽居品茶空间特点',
          titleEn: 'Features of Private Tea Space',
          features: [
            '源于宋代士大夫避世隐居之风',
            '注重独处静思，与自然对话',
            '设计上追求简洁高雅，避免喧嚣',
            '适合独自品茶冥想，享受宁静时光',
            '多采用天然木材，营造幽静雅致的氛围',
            '茶具以朴素为美，与主人的淡泊心境相符'
          ],
          featuresEn: [
            'Originated from the seclusion traditions of Song Dynasty scholars',
            'Emphasizes quiet contemplation and harmony with nature',
            'Design pursues simplicity and elegance, avoiding noise',
            'Ideal for solitary tea meditation and enjoying peaceful moments',
            'Uses natural wood to create a serene and elegant atmosphere',
            'Tea utensils favor simplicity, matching the owner\'s tranquil mindset'
          ]
        };
      case '禅修式品茶空间':
        return {
          title: '禅修茶室特点',
          titleEn: 'Features of Zen Tea Space',
          features: [
            '承袭了宋代寺院茶礼的精神',
            '注重心性修持与精神净化',
            '空间布局遵循"清、寂、空"三原则',
            '以黑白灰为主色调，简约肃穆',
            '适合静坐冥想，修身养性',
            '体验禅茶一味的境界'
          ],
          featuresEn: [
            'Inherits the spirit of Song Dynasty temple tea ceremonies',
            'Focuses on spiritual cultivation and purification',
            'Spatial layout follows three principles: clarity, tranquility, and emptiness',
            'Uses black, white, and gray as the main colors for a simple and solemn atmosphere',
            'Suitable for quiet meditation and self-cultivation',
            'Experiences the unity of Zen and tea'
          ]
        };
      case '雅集式品茶空间':
        return {
          title: '雅集茶室特点',
          titleEn: 'Features of Elegant Gathering Tea Space',
          features: [
            '重在文人雅士的社交空间',
            '强调文化氛围与文人交流',
            '空间布置精巧雅致，多置书画、古籍及文房四宝',
            '常见琴棋书画元素',
            '适合志同道合者品茗论道',
            '分享艺术与智慧的理想场所'
          ],
          featuresEn: [
            'Focuses on social interactions among scholars and literati',
            'Emphasizes cultural atmosphere and communication',
            'Features sophisticated arrangements with calligraphy, paintings, and scholarly items',
            'Often includes elements of music, chess, calligraphy, and painting',
            'Ideal for like-minded individuals to enjoy tea and exchange ideas',
            'Perfect venue for sharing art and wisdom'
          ]
        };
      case '闲游式品茶空间':
        return {
          title: '闲游品茶空间特点',
          titleEn: 'Features of Casual Leisure Tea Space',
          features: [
            '体现宋人对日常生活的审美追求',
            '不拘一格，随性自然',
            '常设于园林亭台、溪水之畔或家居一角',
            '强调与自然环境融合',
            '氛围轻松惬意，适合家人朋友闲谈小聚',
            '享受生活之乐，体现宋人"和乐自然"的生活智慧'
          ],
          featuresEn: [
            'Reflects the Song Dynasty aesthetic pursuit in daily life',
            'Versatile and naturally spontaneous in style',
            'Often set in garden pavilions, by streams, or in a home corner',
            'Emphasizes integration with natural environments',
            'Relaxed atmosphere, ideal for casual gatherings with family and friends',
            'Embodies the Song Dynasty wisdom of "harmony and natural joy"'
          ]
        };
      default:
        return {
          title: '茶室特点',
          titleEn: 'Tea Room Features',
          features: ['暂无详细信息'],
          featuresEn: ['No detailed information available']
        };
    }
  };
  
  // 获取茶室特点数据
  const teaRoomFeatures = getTeaRoomFeatures();

  const handleBack = () => {
    // 传递参数回设计页面
    navigate('/designer', { 
      state: { 
        savedParameters: parameters,
        savedType: selectedType,
        savedPrompt: prompt
      } 
    });
  };

  const handleDownload = () => {
    // 如果有生成的图像，则下载图像
    if (generatedImage) {
      // 创建一个临时链接
      fetch(generatedImage)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${selectedType}-设计效果图.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url); // 释放URL对象
        })
        .catch(err => {
          console.error('下载图像失败:', err);
          setError('下载图像失败，请直接在图片上右键选择"图片另存为"');
        });
    }
  };

  // 如果没有传递生成的图像，则显示错误信息
  if (!location.state) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          未找到设计数据，请返回设计页面重新生成
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/designer')}
        >
          返回设计页面
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', background: `url("${getImagePath('76e4a88d66d4d9a7f1c21a465a581ac.png')}")`, backgroundSize: 'cover' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {language === 'zh' ? '设计方案' : 'Design Solution'}
        </Typography>

        <Grid container spacing={4}>
          {/* 生成的效果图 - 左侧 */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {generatedImage ? (
                <CardMedia
                  component="img"
                  sx={{ 
                    maxHeight: '600px', 
                    objectFit: 'contain',
                    width: '100%'
                  }}
                  image={generatedImage}
                  alt="生成的茶室效果图"
                />
              ) : (
                <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    暂无效果图
                  </Typography>
                </Box>
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {descriptionData.mainDescription}
                </Typography>
                {prompt && (
                  <Typography variant="body2" color="text.secondary">
                    自定义描述: {prompt}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* 设计详情 - 右侧 */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 16 }}>
              <Paper sx={{ 
                p: 3, 
                maxHeight: 'calc(100vh - 140px)',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: '3px',
                }
              }}>
                <Typography variant="h5" gutterBottom>
                  {language === 'zh' ? '设计详情' : 'Design Details'}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  {language === 'zh' ? '茶室类型' : 'Tea Room Type'}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {selectedType}
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  {language === 'zh' ? '设计参数' : 'Design Parameters'}
                </Typography>
                
                {/* 展示参数 */}
                {Object.entries(parameters).map(([category, params]) => (
                  <Box key={category} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 'bold', 
                      color: 'primary.main',
                      bgcolor: 'rgba(121, 85, 72, 0.1)',
                      p: 1,
                      borderRadius: '4px'
                    }}>
                      {language === 'zh' ? category : translateCategory(category)}
                    </Typography>
                    <Box sx={{ pl: 2, pt: 1 }}>
                      {Object.entries(params).map(([paramName, paramValue]) => (
                        <Typography key={paramName} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          <b>{language === 'zh' ? paramName : translateParam(paramName)}:</b> {paramValue}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                ))}
                
                {/* 茶室特点 */}
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  {language === 'zh' ? teaRoomFeatures.title : teaRoomFeatures.titleEn}
                </Typography>
                <Box sx={{ pl: 1 }}>
                  {(language === 'zh' ? teaRoomFeatures.features : teaRoomFeatures.featuresEn).map((feature, index) => (
                    <Typography 
                      key={index} 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 1,
                        display: 'flex',
                        alignItems: 'flex-start',
                        '&:last-child': { mb: 0 }
                      }}
                    >
                      <Box 
                        component="span" 
                        sx={{ 
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          bgcolor: 'primary.light', 
                          display: 'inline-block',
                          mt: 1,
                          mr: 1.5
                        }} 
                      />
                      {feature}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* 操作按钮 */}
        <Box sx={{ 
          mt: 4, 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center', 
          gap: 2 
        }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/')}
            sx={{ 
              minWidth: 140,
              borderColor: 'rgba(121, 85, 72, 0.5)',
              color: '#795548',
              fontFamily: '"FangSong", serif',
              '&:hover': {
                borderColor: '#795548',
                backgroundColor: 'rgba(121, 85, 72, 0.04)'
              }
            }}
          >
            {language === 'zh' ? '返回首页' : 'Back to Home'}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleBack}
            sx={{ 
              minWidth: 140,
              borderColor: 'rgba(121, 85, 72, 0.5)',
              color: '#795548',
              fontFamily: '"FangSong", serif',
              '&:hover': {
                borderColor: '#795548',
                backgroundColor: 'rgba(121, 85, 72, 0.04)'
              }
            }}
          >
            {language === 'zh' ? '返回修改' : 'Back to Edit'}
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleDownload}
            disabled={!generatedImage}
            sx={{ 
              minWidth: 140,
              backgroundColor: '#8D6E63',
              fontFamily: '"FangSong", serif',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              '&:hover': {
                backgroundColor: '#795548'
              }
            }}
          >
            {language === 'zh' ? '下载效果图' : 'Download Image'}
          </Button>
        </Box>

        {/* 错误提示 */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Container>
    </Box>
  );
}

// 辅助函数：翻译参数分类名称
function translateCategory(category) {
  const categoryMap = {
    '基础设置': 'Basic Settings',
    '陈设': 'Decoration',
    '家具': 'Furniture',
    '茶具': 'Tea Set',
    '景观': 'Landscape'
  };
  return categoryMap[category] || category;
}

// 辅助函数：翻译参数名称
function translateParam(param) {
  const paramMap = {
    '风格': 'Style',
    '大小': 'Size',
    '光线': 'Lighting',
    '主材质': 'Main Material',
    '茶桌': 'Tea Table',
    '座椅': 'Seating',
    '装饰': 'Decoration',
    '储物柜': 'Storage Cabinet',
    '茶几': 'Tea Tray',
    '茶具架': 'Tea Ware Shelf',
    '茶壶': 'Teapot',
    '茶杯': 'Tea Cup',
    '茶盘': 'Tea Tray',
    '植物': 'Plants',
    '水景': 'Water Feature',
    '灯光': 'Lighting'
  };
  return paramMap[param] || param;
}

export default ResultPage; 