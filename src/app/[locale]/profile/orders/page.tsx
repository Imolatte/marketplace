'use client';

import { Container, Typography, Box, Chip, CircularProgress } from '@mui/material';
import { useTranslations } from 'next-intl';

import { trpc } from '@/lib/trpc/client';

export default function OrdersPage() {
  const t = useTranslations('order');
  const tProfile = useTranslations('profile');
  const { data: orders, isLoading } = trpc.order.getMyOrders.useQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        {tProfile('myOrders')}
      </Typography>

      {!orders?.length ? (
        <Typography color="text.secondary">{tProfile('noOrders')}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {orders.map((order) => (
            <Box
              key={order.id}
              sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {order.listing.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Chip
                  label={t(`statusValue.${order.status}`)}
                  size="small"
                  color={order.status === 'DELIVERED' ? 'success' : 'default'}
                />
                <Typography variant="body2">
                  {t('total')}: ${order.totalAmount / 100}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
