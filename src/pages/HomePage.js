import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage, translations } from '../contexts/LanguageContext';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const BASE_URL = '/tea-room-designer';

const teaRoomTypes = [
  {
    key: 'privateTeaSpace',
    keyDesc: 'privateTeaSpaceDesc',
    image: `${BASE_URL}/images/幽居式品茶空间.jpeg`
  },
  {
    key: 'zenTeaSpace',
    keyDesc: 'zenTeaSpaceDesc',
    image: `${BASE_URL}/images/禅修式品茶空间.jpeg`
  },
  {
    key: 'elegantTeaSpace',
    keyDesc: 'elegantTeaSpaceDesc',
    image: `${BASE_URL}/images/雅集式品茶空间.jpeg`
  },
  {
    key: 'casualTeaSpace',
    keyDesc: 'casualTeaSpaceDesc',
    image: `${BASE_URL}/images/闲游式品茶空间.jpeg`
  }
];

// 筛选以1开头的图片并处理图片名称
const privateTeaImages = [
  `${BASE_URL}/images/1《品茶图轴》 明 文征明.jpeg`,
  `${BASE_URL}/images/1《煮茶图》 元 王蒙.webp`,
  `${BASE_URL}/images/1《煮茶图》 明 唐寅.jpeg`,
  `${BASE_URL}/images/1《高山流水》 明 仇英.jpeg`,
  `${BASE_URL}/images/1《无题》.jpeg`,
  `${BASE_URL}/images/1《无题》.jpeg`,
  `${BASE_URL}/images/1《无题》.webp`,
  `${BASE_URL}/images/1《无题》 (2).jpeg`,
  `${BASE_URL}/images/1 《陆羽烹茶图》元 赵原.jpeg`
];

// 禅修茶室图片集合 - 筛选所有以2开头的图片
const zenTeaImages = [
  `${BASE_URL}/images/2 《天目山居》近代 丰子恺.jpeg`,
  `${BASE_URL}/images/2《烹茶洗砚图》清 钱慧安.jpeg`,
  `${BASE_URL}/images/2《萧翼赚兰亭图》唐 阎立 .jpeg`,
  `${BASE_URL}/images/2 《竹炉山房图》 元 沈贞.jpeg`
];

// 雅集茶室图片集合 - 筛选所有以3开头的图片
const elegantTeaImages = [
  `${BASE_URL}/images/3《无题》.webp`,
  `${BASE_URL}/images/3《无题》.jpeg`,
  `${BASE_URL}/images/3《无题》.jpeg`,
  `${BASE_URL}/images/3《无题》 (2).jpeg`,
  `${BASE_URL}/images/3《无题》 (3).jpeg`,
  `${BASE_URL}/images/3《西园雅集图》 明 仇英.jpeg`,
  `${BASE_URL}/images/3《会昌九老图》 明 李公麟.jpeg`,
  `${BASE_URL}/images/3《品茶图》明 陈洪绶.jpeg`,
  `${BASE_URL}/images/3《十八学士图》 宋 赵喆.jpeg`,
  `${BASE_URL}/images/3《惠山茶会图》 明 文征明.jpeg`,
  `${BASE_URL}/images/3《文會圖》 宋 赵喆.jpeg`,
  `${BASE_URL}/images/3《撵茶图》 南宋 刘松年.jpeg`
];

// 闲游茶室图片集合 - 更新修改后的文件名
const casualTeaImages = [
  `${BASE_URL}/images/4《卢仝烹茶图》宋 钱选 .jpeg`,
  `${BASE_URL}/images/4《梁苑之游》 明.webp`,
  `${BASE_URL}/images/4《兰亭雅集图》 明 仇英.jpeg`,
  `${BASE_URL}/images/4《竹炉图》 明 祝枝山.jpeg`,
  `${BASE_URL}/images/4《无题》.jpeg`,  // 更新原4-7.jpeg的链接
  `${BASE_URL}/images/4《无题》.jpeg`,   // 更新原4-6.jpg的链接
  `${BASE_URL}/images/4 《煮茶图》 明 丁云鹏.jpeg`,
  `${BASE_URL}/images/4《斗茶图》 明 唐寅.jpeg`,
  `${BASE_URL}/images/4 《玉川先生煎茶图》 清 沈农.jpeg`,
  `${BASE_URL}/images/4 《侍茗图》明 唐寅.jpeg`,
  `${BASE_URL}/images/4 《侍茗图》 明 唐寅.jpeg`
];

// 统一的图片标题处理函数 - 适用于所有茶室类型
const getImageTitle = (path) => {
  if (!path) return '';
  // 从完整路径中提取文件名
  const fileName = path.split('/').pop();
  
  // 针对《无题》的特殊处理 - 去掉前面的数字
  if (fileName.includes('《无题》') || fileName.includes('无题')) {
    return '《无题》';
  }
  
  // 处理类似4-7.jpeg这样的文件名
  if (fileName.match(/^\d+-\d+\.(jpg|jpeg|png|webp)$/)) {
    // 仅显示"无题-数字"，不带前缀
    return '无题' + fileName.substring(1).replace(/\.(jpg|jpeg|png|webp)$/, '');
  }
  
  // 处理常规文件名 - 去掉开头的数字和空格
  let title = fileName.replace(/^\d+\s*/, '').replace(/\.(jpg|jpeg|png|webp)$/, '');
  
  // 去掉末尾可能存在的括号部分
  title = title.replace(/\s\(\d+\)$/, '');
  
  return title;
};

// 茶室详情数据
const teaRoomDetails = {
  privateTeaSpace: {
    images: [...privateTeaImages],
    description: '幽居品茶，源于宋代士大夫避世隐居之风。茶室多建于山水之间，借景抒情，以静取胜。室内陈设简洁精致，多采用天然木材，墙面留白或挂一幅山水画，营造幽静雅致的氛围。茶具以朴素为美，与主人的淡泊心境相符，是独处冥想的理想空间。',
    descriptionEn: 'Private tea spaces originated from the seclusion traditions of Song Dynasty scholars. These spaces are often built among mountains and waters, borrowing scenery for emotional expression and achieving tranquility through simplicity. The interior is simple yet exquisite, mainly using natural wood, with blank walls or a landscape painting, creating a serene and elegant atmosphere. The tea utensils favor simplicity, matching the owner\'s detached mindset, making it an ideal space for solitary meditation.'
  },
  zenTeaSpace: {
    images: [...zenTeaImages],
    description: '禅修茶室承袭了宋代寺院茶礼的精神，强调心性修持。空间布局遵循"清、寂、空"三原则，避免繁复装饰，以黑白灰为主色调。茶室内常有一小案几，几上置茶具，地设蒲团，便于正坐品茶。墙上或悬挂禅宗偈语，或留白。整体营造出超脱世俗、返璞归真的氛围，是修身养性的理想场所。',
    descriptionEn: 'Zen tea rooms inherit the spirit of Song Dynasty temple tea ceremonies, emphasizing spiritual cultivation. The spatial layout follows three principles: clarity, tranquility, and emptiness, avoiding excessive decoration, with black, white, and gray as the main colors. The tea room typically has a small table with tea utensils and floor cushions for formal tea drinking. Walls may feature Zen verses or be left blank. The overall atmosphere transcends the mundane world and returns to simplicity, making it an ideal place for self-cultivation.'
  },
  elegantTeaSpace: {
    images: [...elegantTeaImages],
    description: '雅集茶室重在文人雅士的社交空间，宋代文人常以茶会友，论诗品画。此类茶室布置精巧雅致，多置书画、古籍及文房四宝。茶几宽敞，可容纳多人围坐，室内常摆放琴、棋等文玩。壁间悬挂名家书画，或设博古架陈设精美器物，营造温文尔雅、高洁风流的氛围，适合志同道合者相聚品茗、谈艺论道。',
    descriptionEn: 'Elegant gathering tea spaces focus on social interactions among scholars and literati. During the Song Dynasty, scholars often used tea gatherings to discuss poetry and appreciate paintings. These tea rooms are exquisitely arranged with calligraphy, paintings, ancient books, and scholarly items. The tea table is spacious to accommodate multiple people sitting around, and the room often displays musical instruments, chess, and other cultural artifacts. Walls feature famous calligraphy and paintings, or curio shelves with elegant items, creating a refined and noble atmosphere suitable for like-minded individuals to gather, drink tea, and discuss arts and principles.'
  },
  casualTeaSpace: {
    images: [...casualTeaImages],
    description: '闲游品茶空间体现了宋人对日常生活的审美追求，不拘一格，随性自然。茶室可设于园林亭台、溪水之畔，或家居一角，强调与自然环境的融合。装饰多用花鸟、山水等喜庆元素，色彩丰富明快。茶具选择多样化，既有精致茶具，也有粗犷茶器。整体氛围轻松惬意，适合家人朋友闲谈小聚，体现了宋人"和乐自然"的生活智慧。',
    descriptionEn: 'Casual leisure tea spaces reflect the Song Dynasty people\'s aesthetic pursuit in daily life—versatile and naturally spontaneous. These spaces can be set in garden pavilions, by streams, or in a home corner, emphasizing integration with natural environments. Decorations often use festive elements like flowers, birds, and landscapes, with rich and bright colors. Tea utensils are diverse, including both refined and rustic tea sets. The overall atmosphere is relaxed and comfortable, suitable for casual gatherings with family and friends, embodying the Song people\'s wisdom of "harmony with nature and enjoyment of life".'
  }
};

// 对话框组件
const TeaRoomDetailDialog = ({ open, teaRoomKey, onClose, language }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const { t } = useLanguage();
  
  if (!open) return null;
  
  const details = teaRoomDetails[teaRoomKey];
  
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  // 图片布局类型
  const imageLayouts = ["网格布局", "画廊布局"];
  
  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            background: 'rgba(255, 252, 245, 0.95)',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          fontFamily: language === 'zh' ? '"Noto Serif SC", serif' : 'inherit',
          py: 2
        }}>
          <Typography variant="h5" component="h2" sx={{ 
            fontWeight: 400,
            display: 'flex',
            alignItems: 'center'
          }}>
            <img 
              src={`${BASE_URL}/images/teapot-silhouette.png`}
              alt="茶壶图标" 
              style={{ width: 24, height: 24, marginRight: 8, opacity: 0.7 }} 
            />
            {t[teaRoomKey]}
            <Typography component="span" sx={{ display: 'block', fontSize: '0.7rem', color: 'text.secondary', ml: 1 }}>
              {language === 'zh' ? translations.en[teaRoomKey] : translations.zh[teaRoomKey]}
            </Typography>
          </Typography>
          <IconButton onClick={onClose} edge="end">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <Tabs 
          value={currentTab} 
          onChange={handleTabChange} 
          centered
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              fontFamily: language === 'zh' ? '"Noto Serif SC", serif' : 'inherit',
            }
          }}
        >
          {imageLayouts.map((layout, index) => (
            <Tab key={index} label={language === 'zh' ? layout : (index === 0 ? 'Grid Layout' : 'Gallery Layout')} />
          ))}
        </Tabs>
        
        <DialogContent sx={{ p: 3 }}>
          {/* 图片描述区 */}
          <Box sx={{ mb: 4, p: 2, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.03)' }}>
            <Typography 
              variant="body1" 
              sx={{ 
                lineHeight: 1.8,
                fontFamily: language === 'zh' ? '"Noto Serif SC", serif' : 'inherit',
                fontSize: '1rem',
                textAlign: 'justify'
              }}
            >
              {language === 'zh' ? details.description : (details.descriptionEn || '(English description not available)')}
            </Typography>
          </Box>
          
          {/* 图片网格布局 */}
          {currentTab === 0 && (
            <Grid container spacing={2}>
              {details.images.map((img, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      transition: 'all 0.3s',
                      '&:hover': { 
                        transform: 'translateY(-5px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={img}
                      alt={getImageTitle(img)}
                      sx={{ objectFit: 'cover' }}
                      onClick={() => setEnlargedImage(img)}
                    />
                    <CardContent sx={{ py: 1, px: 2 }}>
                      <Typography variant="body2" component="div" sx={{ 
                        fontFamily: language === 'zh' ? '"Noto Serif SC", serif' : 'inherit',
                        fontSize: '0.85rem',
                        textAlign: 'center',
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {getImageTitle(img)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          
          {/* 图片画廊布局 */}
          {currentTab === 1 && (
            <Box>
              {details.images.map((img, idx) => (
                <Box 
                  key={idx} 
                  sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    mb: 4,
                    bgcolor: 'rgba(0,0,0,0.02)',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 1
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'relative',
                      width: { xs: '100%', md: '60%' },
                      '&:hover .zoom-icon': {
                        opacity: 1
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={img}
                      alt={getImageTitle(img)}
                      sx={{ 
                        height: { xs: 200, md: 300 },
                        objectFit: 'cover',
                        cursor: 'pointer'
                      }}
                      onClick={() => setEnlargedImage(img)}
                      onError={(e) => {
                        console.error(`图片加载失败: ${img}`);
                        e.target.onerror = null; // 防止无限循环
                        e.target.src = '/images/image-placeholder.png'; // 使用占位图
                      }}
                    />
                    <Box 
                      className="zoom-icon"
                      onClick={() => setEnlargedImage(img)}
                      sx={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                        cursor: 'pointer'
                      }}
                    >
                      <ZoomInIcon />
                    </Box>
                  </Box>
                  <Box sx={{ p: 3, width: { xs: '100%', md: '40%' } }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ 
                        fontFamily: language === 'zh' ? '"Noto Serif SC", serif' : 'inherit',
                        borderBottom: '1px solid rgba(0,0,0,0.1)',
                        pb: 1
                      }}
                    >
                      {getImageTitle(img)}
                    </Typography>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      onClick={() => setEnlargedImage(img)}
                      startIcon={<ZoomInIcon />}
                    >
                      {language === 'zh' ? '查看原图' : 'View Full Image'}
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
      </Dialog>
      
      {/* 放大图片对话框 */}
      <Dialog
        open={!!enlargedImage}
        onClose={() => setEnlargedImage(null)}
        maxWidth="xl"
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            {enlargedImage ? getImageTitle(enlargedImage) : ''}
          </Typography>
          <IconButton onClick={() => setEnlargedImage(null)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {enlargedImage && (
            <img 
              src={enlargedImage} 
              alt="大图" 
              style={{ maxWidth: '100%', maxHeight: '80vh' }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const ImageWithFallback = ({ src, alt, ...props }) => {
  const handleError = (e) => {
    console.error(`图片加载失败: ${src}`);
    e.target.src = '/tea-room-designer/images/teapot-silhouette.png'; // 使用默认图片
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t, language } = useLanguage();
  const [openDialog, setOpenDialog] = useState(null);

  useEffect(() => {
    const preloadImages = () => {
      const allImages = [
        ...teaRoomTypes.map(type => type.image),
        ...privateTeaImages,
        ...zenTeaImages,
        ...elegantTeaImages,
        ...casualTeaImages
      ];
      
      allImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
  }, []);

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url("/images/renjianBg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: -1,
        }
      }}
    >
      {/* 头部区域 */}
      <Box
        sx={{
          height: '70vh',
          background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/images/饮茶.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          "&::before": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(1px)',
          }
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
              mb: 3
            }}
          >
            {t.title}
          </Typography>
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              mb: 4,
              fontFamily: language === 'zh' ? '"Noto Serif SC", serif' : 'inherit',
              textShadow: '1px 1px 2px rgba(0,0,0,0.4)' 
            }}
          >
            {t.subtitle}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/designer')}
            sx={{ 
              mt: 4,
              backgroundColor: 'rgba(141, 110, 99, 0.9)',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
              }
            }}
          >
            {t.startDesign}
          </Button>
        </Container>
      </Box>

      {/* 茶室类型展示 */}
      <Container 
        sx={{ 
          py: 8, 
          backgroundColor: 'rgba(255, 252, 245, 0.9)',
          mt: -5,
          borderRadius: '16px 16px 0 0',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 3
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          textAlign="center" 
          gutterBottom
          sx={{ 
            mb: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '2px'
            }
          }}
        >
          {t.teaRoomTypes}
          <Typography 
            variant="body2" 
            component="span" 
            sx={{ 
              display: 'block', 
              fontSize: '0.5em', 
              color: 'text.secondary',
              mt: 1 
            }}
          >
            {language === 'zh' ? 'Tea Room Types' : '茶室类型'}
          </Typography>
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {teaRoomTypes.map((type, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                onClick={() => setOpenDialog(type.key)}
                sx={{ 
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(5px)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    transition: 'transform 0.4s ease-in-out'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={type.image}
                  alt={t[type.key]}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h3">
                    {t[type.key]}
                    <Typography 
                      variant="caption" 
                      component="div" 
                      sx={{ 
                        fontSize: '0.7em', 
                        mt: 0.5,
                        color: 'text.secondary' 
                      }}
                    >
                      {language === 'zh' 
                        ? translations.en[type.key] 
                        : translations.zh[type.key]}
                    </Typography>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t[type.keyDesc]}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      mt: 1, 
                      textAlign: 'right', 
                      color: theme.palette.primary.main,
                      fontStyle: 'italic'
                    }}
                  >
                    {language === 'zh' ? '点击查看详情' : 'Click for details'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 添加详情对话框 */}
      <TeaRoomDetailDialog
        open={!!openDialog}
        teaRoomKey={openDialog}
        onClose={() => setOpenDialog(null)}
        language={language}
      />
    </Box>
  );
}

export default HomePage; 
