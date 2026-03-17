'use client';

import { Container, Typography, Box, Chip, CircularProgress, Paper } from '@mui/material';
import { ShoppingBagOutlined } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

import { trpc } from '@/lib/trpc/client';

export default function OrdersPage() {
  const t = useTranslations('order');
  const tProfile = useTranslations('profile');
  const { data: orders, isLoading } = trpc.order.getMyOrders.useQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
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
          {tProfile('myOrders')}
        </Typography>

        {!orders?.length ? (
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
              <ShoppingBagOutlined sx={{ fontSize: 32, color: 'primary.main' }} />
            </Box>
            <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
              {tProfile('noOrders')}
            </Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {orders.map((order) => (
              <Paper
                key={order.id}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'rgba(79, 70, 229, 0.2)',
                    boxShadow: '0 4px 12px -4px rgba(0, 0, 0, 0.08)',
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {order.listing.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1.5, alignItems: 'center' }}>
                  <Chip
                    label={t(`statusValue.${order.status}`)}
                    size="small"
                    color={order.status === 'DELIVERED' ? 'success' : 'default'}
                    sx={{ fontWeight: 600 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    {t('total')}: ${order.totalAmount / 100}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
