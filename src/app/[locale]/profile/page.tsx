'use client';

import { Container, Typography, Box, Avatar, Tabs, Tab, Paper } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ProfilePage() {
  const t = useTranslations('profile');
  const { data: session } = useSession();
  const [tab, setTab] = useState(0);

  if (!session?.user) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Please sign in to view your profile.
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
        {/* Profile Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: '1px solid rgba(0, 0, 0, 0.06)',
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Avatar
            src={session.user.image || undefined}
            sx={{
              width: { xs: 64, md: 88 },
              height: { xs: 64, md: 88 },
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 800,
              border: '3px solid rgba(79, 70, 229, 0.15)',
            }}
          >
            {session.user.name?.[0]}
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.3rem', md: '1.8rem' },
                letterSpacing: '-0.02em',
              }}
            >
              {session.user.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', fontWeight: 500, mt: 0.25 }}
            >
              {session.user.email}
            </Typography>
          </Box>
        </Paper>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: 4,
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            },
          }}
        >
          <Tab label={t('myListings')} />
          <Tab label={t('favorites')} />
          <Tab label={t('myOrders')} />
          <Tab label={t('mySales')} />
        </Tabs>

        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 3,
            border: '1px solid rgba(0, 0, 0, 0.06)',
            textAlign: 'center',
          }}
        >
          <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
            Content for each tab will be loaded here.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
