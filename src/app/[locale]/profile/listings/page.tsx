'use client';

import { Container, Typography, Box, Paper } from '@mui/material';
import { Inventory2Outlined } from '@mui/icons-material';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function MyListingsPage() {
  const t = useTranslations('profile');
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Please sign in.
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '80vh',
        background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.03) 0%, transparent 300px)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            letterSpacing: '-0.02em',
            mb: 4,
          }}
        >
          {t('myListings')}
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 8,
            borderRadius: 4,
            border: '1px solid rgba(0, 0, 0, 0.06)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              background: 'rgba(79, 70, 229, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Inventory2Outlined sx={{ fontSize: 32, color: 'primary.main' }} />
          </Box>
          <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
            {t('noListings')}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
