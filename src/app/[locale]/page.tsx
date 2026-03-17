import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Search, Payment, Star, ArrowForward, TrendingUp } from '@mui/icons-material';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { FeaturedListings } from '@/components/home/FeaturedListings';

const CATEGORIES = [
  { key: 'Electronics', icon: '📱', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { key: 'Clothing', icon: '👕', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { key: 'Home', icon: '🏠', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { key: 'Sports', icon: '⚽', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { key: 'Books', icon: '📚', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { key: 'Toys', icon: '🎮', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
];

export default function HomePage() {
  const t = useTranslations('home');

  const steps = [
    {
      icon: <Search sx={{ fontSize: 28 }} />,
      title: t('step1Title'),
      desc: t('step1Desc'),
      color: '#4f46e5',
      bg: 'rgba(79, 70, 229, 0.08)',
    },
    {
      icon: <Payment sx={{ fontSize: 28 }} />,
      title: t('step2Title'),
      desc: t('step2Desc'),
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.08)',
    },
    {
      icon: <Star sx={{ fontSize: 28 }} />,
      title: t('step3Title'),
      desc: t('step3Desc'),
      color: '#ec4899',
      bg: 'rgba(236, 72, 153, 0.08)',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        className="gradient-bg-hero"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 10, md: 14 },
          pb: { xs: 10, md: 16 },
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center' }}>
            {/* Badge */}
            <Box
              className="animate-fade-in-up"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.75,
                mb: 3,
                borderRadius: 10,
                background: 'rgba(79, 70, 229, 0.08)',
                border: '1px solid rgba(79, 70, 229, 0.15)',
              }}
            >
              <TrendingUp sx={{ fontSize: 16, color: '#4f46e5' }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: '#4f46e5',
                  fontSize: '0.8rem',
                  letterSpacing: '0.02em',
                }}
              >
                Marketplace
              </Typography>
            </Box>

            <Typography
              variant="h2"
              component="h1"
              className="animate-fade-in-up stagger-1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.5rem', sm: '3.2rem', md: '4rem' },
                lineHeight: 1.05,
                letterSpacing: '-0.035em',
                mb: 2.5,
                background: 'linear-gradient(135deg, #1a1a2e 0%, #4f46e5 50%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('title')}
            </Typography>

            <Typography
              variant="h6"
              className="animate-fade-in-up stagger-2"
              sx={{
                color: 'text.secondary',
                maxWidth: 480,
                mx: 'auto',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.2rem' },
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              {t('subtitle')}
            </Typography>

            <Box className="animate-fade-in-up stagger-3" sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/listings" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    boxShadow: '0 8px 24px -4px rgba(79, 70, 229, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px -4px rgba(79, 70, 229, 0.5)',
                      background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                    },
                  }}
                >
                  {t('viewAll')}
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Categories */}
        <Box sx={{ py: { xs: 6, md: 8 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography
                variant="h4"
                className="animate-fade-in-up"
                sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, letterSpacing: '-0.02em' }}
              >
                {t('categories')}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(6, 1fr)',
              },
              gap: { xs: 1.5, md: 2 },
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.key} href={`/listings?category=${cat.key}`} style={{ textDecoration: 'none' }}>
                <Paper
                  elevation={0}
                  className={`animate-fade-in-up stagger-${i + 1}`}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: 'rgba(79, 70, 229, 0.3)',
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 32px -8px rgba(0, 0, 0, 0.1)',
                      '& .cat-icon': {
                        transform: 'scale(1.15)',
                      },
                      '& .cat-glow': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  {/* Background glow */}
                  <Box
                    className="cat-glow"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: cat.gradient,
                      opacity: 0,
                      transition: 'opacity 0.35s ease',
                      filter: 'blur(40px)',
                      transform: 'scale(0.5)',
                    }}
                  />
                  <Typography
                    className="cat-icon"
                    sx={{
                      fontSize: { xs: 32, md: 38 },
                      mb: 1,
                      transition: 'transform 0.35s ease',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {cat.icon}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      position: 'relative',
                      zIndex: 1,
                      fontSize: '0.85rem',
                    }}
                  >
                    {cat.key}
                  </Typography>
                </Paper>
              </Link>
            ))}
          </Box>
        </Box>

        {/* Featured Listings */}
        <Box sx={{ pb: { xs: 6, md: 8 } }}>
          <FeaturedListings />
        </Box>

        {/* How It Works */}
        <Box
          sx={{
            pb: { xs: 8, md: 12 },
          }}
        >
          <Typography
            variant="h4"
            className="animate-fade-in-up"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.5rem', md: '2rem' },
              letterSpacing: '-0.02em',
              mb: 4,
            }}
          >
            {t('howItWorks')}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {steps.map((step, i) => (
              <Paper
                key={i}
                elevation={0}
                className={`animate-fade-in-up stagger-${i + 1}`}
                sx={{
                  p: { xs: 3.5, md: 4 },
                  borderRadius: 4,
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: 'rgba(79, 70, 229, 0.2)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 16px 32px -8px rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                {/* Step number */}
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 20,
                    fontSize: '4rem',
                    fontWeight: 900,
                    lineHeight: 1,
                    color: 'rgba(0, 0, 0, 0.03)',
                    letterSpacing: '-0.05em',
                    userSelect: 'none',
                  }}
                >
                  {i + 1}
                </Typography>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 3,
                    background: step.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.color,
                    mb: 2.5,
                  }}
                >
                  {step.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontSize: '1.1rem',
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
