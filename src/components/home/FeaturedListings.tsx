'use client';

import { Box, Typography, Skeleton } from '@mui/material';
import { useTranslations } from 'next-intl';
import { trpc } from '@/lib/trpc/client';
import { ListingGrid } from '@/components/listing/ListingGrid';

export function FeaturedListings() {
  const t = useTranslations('home');
  const { data: listings, isLoading } = trpc.listing.getFeatured.useQuery();

  if (isLoading) {
    return (
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.5rem', md: '2rem' },
            letterSpacing: '-0.02em',
            mb: 4,
          }}
        >
          {t('featured')}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 3,
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <Box key={i}>
              <Skeleton
                variant="rounded"
                sx={{
                  width: '100%',
                  paddingTop: '100%',
                  borderRadius: 3,
                }}
              />
              <Skeleton variant="text" sx={{ mt: 1.5, width: '80%' }} />
              <Skeleton variant="text" sx={{ width: '40%' }} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (!listings?.length) return null;

  return (
    <Box>
      <Typography
        variant="h4"
        className="animate-fade-in-up"
        sx={{
          fontWeight: 800,
          fontSize: { xs: '1.5rem', md: '2rem' },
          letterSpacing: '-0.02em',
          mb: 4,
        }}
      >
        {t('featured')}
      </Typography>
      <ListingGrid listings={listings} />
    </Box>
  );
}
