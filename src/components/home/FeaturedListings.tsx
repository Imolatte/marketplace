'use client';

import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslations } from 'next-intl';
import { trpc } from '@/lib/trpc/client';
import { ListingGrid } from '@/components/listing/ListingGrid';

export function FeaturedListings() {
  const t = useTranslations('home');
  const { data: listings, isLoading } = trpc.listing.getFeatured.useQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!listings?.length) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight={600}>
        {t('featured')}
      </Typography>
      <ListingGrid listings={listings} />
    </Box>
  );
}
