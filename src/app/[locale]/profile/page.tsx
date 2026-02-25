'use client';

import { Container, Typography, Box, Avatar, Tabs, Tab } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ProfilePage() {
  const t = useTranslations('profile');
  const { data: session } = useSession();
  const [tab, setTab] = useState(0);

  if (!session?.user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Please sign in to view your profile.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Avatar src={session.user.image || undefined} sx={{ width: 80, height: 80 }}>
          {session.user.name?.[0]}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            {session.user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {session.user.email}
          </Typography>
        </Box>
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label={t('myListings')} />
        <Tab label={t('favorites')} />
        <Tab label={t('myOrders')} />
        <Tab label={t('mySales')} />
      </Tabs>

      <Typography color="text.secondary">
        Content for each tab will be loaded here.
      </Typography>
    </Container>
  );
}
