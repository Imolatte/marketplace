import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { Search, Payment, Star } from '@mui/icons-material';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { FeaturedListings } from '@/components/home/FeaturedListings';

const CATEGORIES = [
  { key: 'Electronics', icon: '📱' },
  { key: 'Clothing', icon: '👕' },
  { key: 'Home', icon: '🏠' },
  { key: 'Sports', icon: '⚽' },
  { key: 'Books', icon: '📚' },
  { key: 'Toys', icon: '🎮' },
];

export default function HomePage() {
  const t = useTranslations('home');

  const steps = [
    { icon: <Search sx={{ fontSize: 40 }} />, title: t('step1Title'), desc: t('step1Desc') },
    { icon: <Payment sx={{ fontSize: 40 }} />, title: t('step2Title'), desc: t('step2Desc') },
    { icon: <Star sx={{ fontSize: 40 }} />, title: t('step3Title'), desc: t('step3Desc') },
  ];

  return (
    <Box
      sx={{
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Hero */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8edf5 100%)',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            fontWeight={800}
            sx={{
              animation: 'fadeInUp 0.8s ease-out both',
              fontSize: { xs: '2rem', md: '3.5rem' },
              background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
            sx={{
              animation: 'fadeInUp 0.8s ease-out 0.15s both',
              maxWidth: 500,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            {t('subtitle')}
          </Typography>
          <Box sx={{ animation: 'fadeInUp 0.8s ease-out 0.3s both' }}>
            <Link href="/listings" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  px: 5,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(25, 118, 210, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.5)',
                  },
                }}
              >
                {t('viewAll')}
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Categories */}
        <Box sx={{ py: 6, animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
            {t('categories')}
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
              gap: 2,
            }}
          >
            {CATEGORIES.map((cat) => (
              <Link key={cat.key} href={`/listings?category=${cat.key}`} style={{ textDecoration: 'none' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    textAlign: 'center',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: 32, mb: 0.5 }}>{cat.icon}</Typography>
                  <Typography variant="body2" fontWeight={500}>{cat.key}</Typography>
                </Paper>
              </Link>
            ))}
          </Box>
        </Box>

        {/* Featured Listings */}
        <Box sx={{ pb: 6, animation: 'fadeInUp 0.8s ease-out 0.5s both' }}>
          <FeaturedListings />
        </Box>

        {/* How It Works */}
        <Box sx={{ pb: 8, animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
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
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>{step.icon}</Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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
