import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          {t('title')}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {t('subtitle')}
        </Typography>
        <Link href="/listings" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            {t('viewAll')}
          </Button>
        </Link>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          {t('featured')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Featured listings will appear here.
        </Typography>
      </Box>
    </Container>
  );
}
