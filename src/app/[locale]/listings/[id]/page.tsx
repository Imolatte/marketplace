'use client';

import { use } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

import { trpc } from '@/lib/trpc/client';

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations('listing');
  const { data: session } = useSession();
  const { data: listing, isLoading } = trpc.listing.getById.useQuery({ id });
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation();

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount / 100);
  };

  const handleBuy = async () => {
    const result = await createCheckout.mutateAsync({ listingId: id });
    if (result.url) {
      window.location.href = result.url;
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!listing) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Listing not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          {listing.images[0] && (
            <Box
              component="img"
              src={listing.images[0]}
              alt={listing.title}
              sx={{ width: '100%', borderRadius: 2, maxHeight: 500, objectFit: 'cover' }}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h4" fontWeight={700}>
            {listing.title}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mt: 1 }}>
            {formatPrice(listing.price, listing.currency)}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Chip label={t(`conditionValue.${listing.condition}`)} variant="outlined" />
            <Chip label={listing.category} />
            <Chip label={t(`statusValue.${listing.status}`)} color={listing.status === 'ACTIVE' ? 'success' : 'default'} />
          </Box>

          {session?.user && session.user.id !== listing.userId && listing.status === 'ACTIVE' && (
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleBuy}
              disabled={createCheckout.isPending}
            >
              {t('buyNow')}
            </Button>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={listing.user.image || undefined}>
              {listing.user.name?.[0]}
            </Avatar>
            <Box>
              <Typography variant="subtitle2">{t('seller')}</Typography>
              <Typography variant="body1">{listing.user.name}</Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {listing.description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
