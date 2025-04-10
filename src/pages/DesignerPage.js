import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab,
  TextField,
  Divider,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateTeaRoomImage } from '../services/apiService';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '@mui/material/styles';

const designParameters = {
  基础设置: {
    风格: ['中式传统', '日式禅意', '现代简约', '复古典雅', '自然生态'],
    大小: ['小型(10-20平方米)', '中型(20-40平方米)', '大型(40-80平方米)', '超大(80平方米以上)'],
    光线: ['自然光充足', '柔和暖光', '明亮灯光', '昏暗静谧'],
    主材质: ['实木为主', '竹材为主', '石材为主', '混合材质'],
  },
  陈设: {
    茶桌: ['实木茶桌', '竹制茶桌', '石制茶桌', '玻璃茶桌'],
    座椅: ['实木座椅', '竹制座椅', '蒲团', '榻榻米'],
    装饰: ['字画', '盆景', '香炉', '屏风'],
  },
  家具: {
    储物柜: ['实木柜', '竹制柜', '现代简约柜', '传统柜'],
    茶几: ['实木茶几', '竹制茶几', '石制茶几', '玻璃茶几'],
    茶具架: ['实木架', '竹制架', '金属架', '组合架'],
  },
  茶具: {
    茶壶: ['紫砂壶', '玻璃壶', '陶瓷壶', '银壶'],
    茶杯: ['紫砂杯', '玻璃杯', '陶瓷杯', '银杯'],
    茶盘: ['实木茶盘', '竹制茶盘', '石制茶盘', '金属茶盘'],
  },
  景观: {
    植物: ['竹子', '松树', '梅花', '兰花'],
    水景: ['流水', '静水', '喷泉', '无'],
    灯光: ['自然光', '暖光', '射灯', '组合光'],
  },
  视角设置: {
    观察角度: ['俯视45度', '平视', '仰视', '鸟瞰'],
    观察距离: ['近景', '中景', '远景'],
    重点展示: ['整体空间', '茶具细节', '家具布局', '景观元素']
  },
  光线设置: {
    主光源: ['自然采光', '人工照明', '混合光源'],
    光线强度: ['明亮', '适中', '昏暗'],
    氛围营造: ['禅意', '温馨', '典雅', '自然']
  },
};

// 茶室类型特定配置
const teaRoomTypeConfig = {
  '幽居式品茶空间': {
    description: '幽居品茶空间源于宋代士大夫避世隐居之风。此类空间注重独处静思，与自然对话。设计上追求简洁高雅，避免喧嚣，以静取胜。适合独处冥想，享受宁静时光。',
    descriptionEn: 'Private tea spaces originated from the seclusion traditions of Song Dynasty scholars. These spaces emphasize quiet contemplation and harmony with nature. The design pursues simplicity and elegance, avoiding excessive decoration to achieve tranquility. Ideal for solitary meditation and enjoying peaceful moments.',
    parameters: {
      基础设置: {
        风格: ['山水雅居', '竹林幽境', '古朴淡雅', '书房茶室', '自然简约'],
        大小: ['小型(10-20平方米)', '中型(20-30平方米)'],
        光线: ['柔和自然光', '晨曦微光', '昏暗静谧', '烛光氛围'],
        主材质: ['天然原木', '青竹材质', '石材点缀', '混合材质'],
      },
      陈设: {
        茶桌: ['矮式木桌', '原木茶案', '竹制茶几', '石台茶几'],
        座椅: ['蒲团坐垫', '简约木椅', '竹编坐垫', '布艺坐垫'],
        装饰: ['山水画', '兰花盆栽', '古籍书架', '文房四宝'],
      },
      家具: {
        储物柜: ['简约书架', '木质茶柜', '多宝阁', '壁龛收纳'],
        茶几: ['小巧边几', '竹编托盘', '木质矮几', '多功能茶几'],
        茶具架: ['木质茶具架', '壁挂式收纳', '简易置物架', '古韵搁物架'],
      },
      茶具: {
        茶壶: ['紫砂小壶', '白瓷茶壶', '粗陶茶壶', '竹编提梁壶'],
        茶杯: ['小巧品茗杯', '朴素陶杯', '白瓷杯', '竹节杯'],
        茶盘: ['原木茶盘', '竹制茶盘', '石质茶盘', '陶制茶盘'],
      },
      景观: {
        植物: ['兰花', '幽篁竹', '梅花', '小巧盆景'],
        水景: ['涓涓细流', '山泉引水', '雨声潺潺', '无'],
        灯光: ['自然光', '温暖烛光', '柔和灯光', '月影灯'],
      },
    }
  },
  '禅修式品茶空间': {
    description: '禅修茶室承袭了宋代寺院茶礼的精神，注重心性修持。空间布局遵循"清、寂、空"三原则，以黑白灰为主色调，简约肃穆。适合静坐冥想，修身养性，体验禅茶一味的境界。',
    descriptionEn: 'Zen tea rooms inherit the spirit of Song Dynasty temple tea ceremonies, emphasizing spiritual cultivation. The spatial layout follows three principles: clarity, tranquility, and emptiness, with black, white, and gray as the main colors, creating a simple and solemn atmosphere. Suitable for quiet meditation and experiencing the unity of Zen and tea.',
    parameters: {
      基础设置: {
        风格: ['禅意简约', '寺院风格', '古刹意境', '枯山水风', '素雅简朴'],
        大小: ['小型(10-20平方米)', '中型(20-30平方米)'],
        光线: ['晨光微曦', '侧光含蓄', '顶光禅意', '自然光影'],
        主材质: ['原木禅风', '石材质朴', '草编自然', '古朴土墙'],
      },
      陈设: {
        茶桌: ['僧侣茶案', '古朴木几', '石台茶几', '矮式茶几'],
        座椅: ['蒲团正坐', '坐禅垫', '草编坐垫', '木质禅凳'],
        装饰: ['禅宗字画', '石摆件', '香炉', '木鱼'],
      },
      家具: {
        储物柜: ['简约柜架', '壁龛收纳', '无', '古木陈列架'],
        茶几: ['朴素茶几', '矮几', '无', '多功能几'],
        茶具架: ['简易茶具架', '壁挂收纳', '矮柜', '古朴搁架'],
      },
      茶具: {
        茶壶: ['古朴陶壶', '黑陶茶壶', '素釉茶壶', '铁质茶壶'],
        茶杯: ['朴素茶碗', '素色杯', '木质茶杯', '陶制茶杯'],
        茶盘: ['石质茶盘', '古木茶盘', '素色陶盘', '简约茶盘'],
      },
      景观: {
        植物: ['青松', '墨竹', '石上苔', '无'],
        水景: ['细水长流', '雨滴落音', '无', '枯山水意境'],
        灯光: ['晨光微曦', '昏暗禅意', '烛光冥想', '自然光线'],
      },
    }
  },
  '雅集式品茶空间': {
    description: '雅集茶室重在文人雅士的社交空间，强调文化氛围与交流。空间布置精巧雅致，多置书画、古籍及文房四宝，常见琴棋书画元素，这里是志同道合者品茗论道，分享艺术与智慧的理想场所。',
    descriptionEn: 'Elegant gathering tea spaces focus on social interactions among scholars and literati, emphasizing cultural atmosphere and communication. The space features sophisticated arrangements with calligraphy, paintings, ancient books, and scholarly items, often including elements of music, chess, calligraphy, and painting. It\'s an ideal place for like-minded individuals to enjoy tea while discussing arts and wisdom.',
    parameters: {
      基础设置: {
        风格: ['文人雅集', '古朴书香', '琴棋书画', '诗词风雅', '名士风范'],
        大小: ['中型(20-40平方米)', '大型(40-80平方米)'],
        光线: ['书房雅光', '明亮均匀', '自然采光', '暖色灯光'],
        主材质: ['红木家具', '名贵木材', '文房陈设', '古色古香'],
      },
      陈设: {
        茶桌: ['古韵长桌', '文人茶案', '雅集茶席', '博古茶台'],
        座椅: ['文人木椅', '红木椅', '绣墩围坐', '太师椅'],
        装饰: ['名家字画', '古籍书架', '古董陈列', '琴棋书画'],
      },
      家具: {
        储物柜: ['古典书柜', '博古架', '多宝阁', '文房收纳'],
        茶几: ['围坐茶几', '名贵木几', '多功能书案', '古典几案'],
        茶具架: ['精美茶架', '多层展示架', '古董陈列架', '华丽摆架'],
      },
      茶具: {
        茶壶: ['精品紫砂', '名窑瓷器', '古董茶具', '收藏级茶壶'],
        茶杯: ['文人杯品', '名瓷茶杯', '古韵品杯', '精致杯具'],
        茶盘: ['名贵木盘', '古董茶船', '精雕茶托', '大型茶盘'],
      },
      景观: {
        植物: ['岁寒三友', '文人雅竹', '古典盆景', '名贵花卉'],
        水景: ['微型山水', '古朴泉石', '庭院引流', '名园意境'],
        灯光: ['古典灯饰', '明亮书房灯', '蜡烛辅助', '温馨灯光'],
      },
    }
  },
  '闲游式品茶空间': {
    description: '闲游品茶空间体现宋人对日常生活的审美追求，不拘一格，随性自然。茶室常设于园林亭台、溪水之畔或家居一角，强调与自然环境融合。氛围轻松惬意，适合家人朋友闲谈小聚，享受生活之乐。',
    descriptionEn: 'Casual leisure tea spaces reflect the Song Dynasty people\'s aesthetic pursuit in daily life—versatile and naturally spontaneous. These spaces are often set in garden pavilions, by streams, or in a home corner, emphasizing integration with natural environments. The atmosphere is relaxed and comfortable, ideal for casual gatherings with family and friends to enjoy the pleasures of life.',
    parameters: {
      基础设置: {
        风格: ['园林自然', '山水野趣', '居家随性', '田园闲适', '户外野趣'],
        大小: ['中型(20-40平方米)', '大型(40-80平方米)', '超大(80平方米以上)'],
        光线: ['自然光充足', '林间斑驳光', '户外阳光', '庭院光影'],
        主材质: ['天然原石', '野趣竹木', '混合材质', '天然藤编'],
      },
      陈设: {
        茶桌: ['野趣石桌', '户外茶席', '园林亭桌', '自然原木桌'],
        座椅: ['藤编躺椅', '草坪垫席', '户外茶凳', '随性坐垫'],
        装饰: ['自然花卉', '季节植物', '野趣摆件', '户外装饰'],
      },
      家具: {
        储物柜: ['户外收纳', '简易架子', '移动式储物', '防水柜箱'],
        茶几: ['自然石几', '树桩茶几', '户外几案', '随性边几'],
        茶具架: ['简易摆架', '户外陈列', '移动茶车', '野趣置物'],
      },
      茶具: {
        茶壶: ['旅行茶具', '户外壶具', '大容量茶壶', '耐用茶具'],
        茶杯: ['户外杯具', '便携茶杯', '粗陶大杯', '随性杯品'],
        茶盘: ['户外茶盘', '防水盘具', '大型茶船', '简易茶席'],
      },
      景观: {
        植物: ['自然山林', '季节花卉', '庭院植被', '野趣盆栽'],
        水景: ['溪流环绕', '小型瀑布', '园林水景', '池塘景观'],
        灯光: ['自然光影', '户外灯火', '篝火氛围', '星光月色'],
      },
    }
  }
};

// 添加预设组合
const presetCombinations = {
  '禅意静谧': {
    视角设置: {
      观察角度: '俯视45度',
      观察距离: '中景',
      重点展示: '整体空间'
    },
    光线设置: {
      主光源: '自然采光',
      光线强度: '昏暗',
      氛围营造: '禅意'
    }
  },
  '现代明亮': {
    视角设置: {
      观察角度: '平视',
      观察距离: '远景',
      重点展示: '整体空间'
    },
    光线设置: {
      主光源: '混合光源',
      光线强度: '明亮',
      氛围营造: '现代'
    }
  }
  // ... 其他预设
};

function DesignerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 检查是否有之前保存的参数
  const savedData = location.state || {};
  
  // 使用保存的参数初始化状态，如果没有则使用默认值
  const [selectedType, setSelectedType] = useState(savedData.savedType || '幽居式品茶空间');
  const [activeTab, setActiveTab] = useState(0);
  const [parameters, setParameters] = useState(savedData.savedParameters || {});
  const [customPrompt, setCustomPrompt] = useState(savedData.savedPrompt || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t, language } = useLanguage();
  const theme = useTheme();
  
  // 修改这部分代码：当茶室类型变化时，仅在非恢复状态时重置参数
  // 添加一个useEffect来处理从结果页返回的情况
  const [isRestoringState, setIsRestoringState] = useState(!!savedData.savedParameters);
  
  useEffect(() => {
    // 如果是从结果页返回并恢复状态，标记一下
    if (isRestoringState) {
      setIsRestoringState(false);
      return;
    }
    
    // 否则正常重置参数
    setParameters({});
    setActiveTab(0);
  }, [selectedType]);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleParameterChange = (category, item, value) => {
    setParameters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: value
      }
    }));
  };

  const handlePromptChange = (event) => {
    setCustomPrompt(event.target.value);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // 处理自定义描述
      const enhanceCustomPrompt = () => {
        if (!customPrompt) return '';
        
        // 添加更多细节和强调
        const enhancedPrompt = `
          重点要求：${customPrompt}
          特别注意：
          - 严格按照描述的视角和布局
          - 确保所描述的元素清晰可见
          - 准确体现空间大小和比例
        `.trim();
        
        return enhancedPrompt;
      };

      // 构建参数对象
      const apiParams = {
        type: selectedType,
        style: parameters.基础设置?.风格,
        size: parameters.基础设置?.大小?.match(/\d+/g)?.[0] || '40',
        lighting: parameters.基础设置?.光线,
        materials: parameters.基础设置?.主材质,

        // 家具部分
        furniture: {
          table: parameters.陈设?.茶桌,
          seating: parameters.陈设?.座椅,
          storage: parameters.家具?.储物柜,
          teaTable: parameters.家具?.茶几,
          teawareStand: parameters.家具?.茶具架
        },

        // 茶具部分
        teaware: {
          pot: parameters.茶具?.茶壶,
          cups: parameters.茶具?.茶杯,
          tray: parameters.茶具?.茶盘
        },

        // 景观部分
        landscape: {
          plants: parameters.景观?.植物,
          water: parameters.景观?.水景,
          lighting: parameters.景观?.灯光
        },

        // 空间特征
        spaceFeatures: {
          size: parameters.基础设置?.大小,
          style: parameters.基础设置?.风格,
          mainMaterial: parameters.基础设置?.主材质
        }
      };

      // 使用增强后的自定义描述
      const result = await generateTeaRoomImage(
        enhanceCustomPrompt(),
        apiParams
      );
      
      if (!result?.data?.[0]?.url) {
        throw new Error('生成的图像数据格式不正确');
      }
      
      navigate('/result', {
        state: {
          parameters,
          selectedType,
          generatedImage: result.data[0].url,
          prompt: customPrompt
        }
      });
      
    } catch (err) {
      console.error('生成图像失败:', err);
      setError(err.message || '生成图像时发生错误');
    } finally {
      setLoading(false);
    }
  };

  const getEnglishCategory = (zhCategory) => {
    const categoryMap = {
      '基础设置': 'Basic Settings',
      '陈设': 'Decoration',
      '家具': 'Furniture',
      '茶具': 'Tea Set',
      '景观': 'Landscape'
    };
    return categoryMap[zhCategory] || zhCategory;
  };

  useEffect(() => {
    const paramKeys = language === 'zh' 
      ? ['基础设置', '陈设', '家具', '茶具', '景观']
      : ['Basic Settings', 'Decoration', 'Furniture', 'Tea Set', 'Landscape'];
    
    // 动态创建参数对象
    // ...
  }, [language]);

  // 在生成之前添加参数验证
  const validateParameters = () => {
    const requiredParams = {
      '基础设置': ['风格', '大小', '光线', '主材质'],
      '陈设': ['茶桌', '座椅'],
      '茶具': ['茶壶', '茶杯']
    };
    
    const missing = [];
    
    Object.entries(requiredParams).forEach(([category, params]) => {
      params.forEach(param => {
        if (!parameters?.[category]?.[param]) {
          missing.push(`${category}-${param}`);
        }
      });
    });
    
    if (missing.length > 0) {
      throw new Error(`请完善以下参数: ${missing.join(', ')}`);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', background: 'url("/images/ink-background.png")', backgroundSize: 'cover' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t.designTitle}
        </Typography>

        {/* 茶室类型选择 */}
        <FormControl 
          fullWidth 
          sx={{ 
            mb: 2,
            '& .MuiInputLabel-root': {
              fontFamily: language === 'zh' ? '"KaiTi", serif' : 'inherit',
              fontSize: '1.05rem'
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              borderColor: 'rgba(0,0,0,0.15)',
              backgroundColor: 'rgba(255,255,255,0.5)',
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.light
                }
              }
            },
            '& .MuiMenuItem-root': {
              fontFamily: language === 'zh' ? '"SimSun", serif' : 'inherit'
            }
          }}
        >
          <InputLabel>{language === 'zh' ? '选择茶室类型' : 'Select Tea Room Type'}</InputLabel>
          <Select
            value={selectedType}
            label={language === 'zh' ? '选择茶室类型' : 'Select Tea Room Type'}
            onChange={handleTypeChange}
          >
            <MenuItem value="幽居式品茶空间">{t.privateTeaSpace}</MenuItem>
            <MenuItem value="禅修式品茶空间">{t.zenTeaSpace}</MenuItem>
            <MenuItem value="雅集式品茶空间">{t.elegantTeaSpace}</MenuItem>
            <MenuItem value="闲游式品茶空间">{t.casualTeaSpace}</MenuItem>
          </Select>
        </FormControl>

        {/* 茶室类型简介 */}
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 3, 
            p: 3, 
            bgcolor: 'rgba(255,252,245,0.85)',
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            borderRadius: '0 8px 8px 0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              fontFamily: language === 'zh' ? '"FangSong", serif' : 'inherit',
              lineHeight: 1.9,
              fontSize: '1.05rem',
              color: 'text.primary',
              position: 'relative',
              pl: 1,
              '&::before': {
                content: '""',
                fontFamily: 'serif',
                fontSize: '1.5rem',
                color: '#A1887F',
                opacity: 0.5,
                position: 'absolute',
                left: -5,
                top: -5
              },
              '&::after': {
                content: '""',
                fontFamily: 'serif',
                fontSize: '1.5rem',
                color: '#A1887F',
                opacity: 0.5
              }
            }}
          >
            {language === 'zh' ? teaRoomTypeConfig[selectedType].description : teaRoomTypeConfig[selectedType].descriptionEn}
          </Typography>
        </Paper>

        {/* 设计参数选项卡 */}
        <Paper sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              '& .MuiTab-root': {
                minWidth: { xs: 70, sm: 90, md: 110 },
                fontFamily: language === 'zh' ? '"FangSong", serif' : 'inherit',
                fontSize: '1rem',
                fontWeight: 'normal',
                opacity: 0.7,
                transition: 'all 0.3s',
                '&.Mui-selected': {
                  opacity: 1,
                  fontWeight: 'bold',
                  color: theme.palette.primary.main
                }
              }
            }}
          >
            {Object.keys(teaRoomTypeConfig[selectedType].parameters).map((category, index) => (
              <Tab 
                key={index} 
                label={
                  <>
                    {category}
                    <Typography variant="caption" sx={{ display: 'block', fontSize: '0.6em' }}>
                      {language === 'zh' ? getEnglishCategory(category) : category}
                    </Typography>
                  </>
                } 
              />
            ))}
          </Tabs>

          <Box sx={{ p: 3, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}>
            {Object.entries(teaRoomTypeConfig[selectedType].parameters).map(([category, items], categoryIndex) => (
              <div
                key={category}
                role="tabpanel"
                hidden={activeTab !== categoryIndex}
              >
                {activeTab === categoryIndex && (
                  <Grid container spacing={3}>
                    {Object.entries(items).map(([item, options]) => (
                      <Grid item xs={12} md={6} key={item}>
                        <FormControl fullWidth>
                          <InputLabel>{item}</InputLabel>
                          <Select
                            value={parameters[category]?.[item] || ''}
                            label={item}
                            onChange={(e) => handleParameterChange(category, item, e.target.value)}
                          >
                            {options.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </div>
            ))}
          </Box>
        </Paper>

        {/* 自定义提示词 */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {t.customDescription}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t.customDescHelper}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="自定义描述"
            variant="outlined"
            value={customPrompt}
            onChange={handlePromptChange}
            placeholder="例如：茶室采用俯视45度角展示，太师椅放置在画面右侧，茶具架靠墙摆放，自然光从左侧窗户斜射入，突出茶具的材质细节..."
            helperText="详细的描述将帮助生成更符合要求的图像"
          />
        </Paper>

        {/* 生成按钮 */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleGenerate}
            disabled={loading}
            sx={{ 
              minWidth: 200,
              height: 48,
              borderRadius: 24,
              background: 'linear-gradient(45deg, #8D6E63 30%, #A1887F 90%)',
              boxShadow: '0 3px 10px rgba(141, 110, 99, 0.3)',
              fontFamily: language === 'zh' ? '"Noto Serif SC", serif' : 'inherit',
              fontSize: '1.1rem',
              letterSpacing: '0.05em',
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: '0 5px 15px rgba(141, 110, 99, 0.5)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                {t.generating}
              </>
            ) : (
              t.generateDesign
            )}
          </Button>
        </Box>

        {/* 错误提示 */}
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default DesignerPage; 