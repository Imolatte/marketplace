'use client';

import { Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function MyListingsPage() {
  const t = useTranslations('profile');
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Please sign in.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        {t('myListings')}
      </Typography>
      <Typography color="text.secondary">
        {t('noListings')}
      </Typography>
    </Container>
  );
}
