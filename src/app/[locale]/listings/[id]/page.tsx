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
  Paper,
} from '@mui/material';
import { ShoppingBag, LocalShipping, Verified } from '@mui/icons-material';
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (!listing) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Listing not found
        </Typography>
      </Container>
    );
  }

  const conditionColors: Record<string, 'success' | 'info' | 'warning' | 'default'> = {
    NEW: 'success',
    LIKE_NEW: 'info',
    GOOD: 'warning',
    FAIR: 'default',
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.02) 0%, transparent 400px)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* Image */}
          <Grid size={{ xs: 12, md: 7 }}>
            {listing.images[0] && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                }}
              >
                <Box
                  component="img"
                  src={listing.images[0]}
                  alt={listing.title}
                  sx={{
                    width: '100%',
                    maxHeight: 560,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Paper>
            )}
          </Grid>

          {/* Details */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box className="animate-fade-in-up">
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.6rem', md: '2rem' },
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {listing.title}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  mt: 2,
                  fontWeight: 800,
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {formatPrice(listing.price, listing.currency)}
              </Typography>

              <Box sx={{ mt: 2.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={t(`conditionValue.${listing.condition}`)}
                  color={conditionColors[listing.condition] || 'default'}
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  label={listing.category}
                  size="small"
                  sx={{
                    background: 'rgba(0, 0, 0, 0.04)',
                    fontWeight: 500,
                  }}
                />
                <Chip
                  label={t(`statusValue.${listing.status}`)}
                  color={listing.status === 'ACTIVE' ? 'success' : 'default'}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              {session?.user && session.user.id !== listing.userId && listing.status === 'ACTIVE' && (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingBag />}
                  onClick={handleBuy}
                  disabled={createCheckout.isPending}
                  sx={{
                    mt: 4,
                    py: 1.75,
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    boxShadow: '0 8px 24px -4px rgba(79, 70, 229, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                      boxShadow: '0 12px 32px -4px rgba(79, 70, 229, 0.5)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {t('buyNow')}
                </Button>
              )}

              {/* Shipping info */}
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2.5,
                  background: 'rgba(16, 185, 129, 0.06)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <LocalShipping sx={{ color: '#10b981', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#059669', fontWeight: 500, fontSize: '0.85rem' }}>
                  Secure payment via Stripe
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Seller */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={listing.user.image || undefined}
                  sx={{
                    width: 48,
                    height: 48,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                  }}
                >
                  {listing.user.name?.[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {t('seller')}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {listing.user.name}
                    </Typography>
                    <Verified sx={{ fontSize: 16, color: 'primary.main' }} />
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.7,
                  color: 'text.secondary',
                }}
              >
                {listing.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
