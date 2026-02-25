'use client';

import { Container, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { useTranslations } from 'next-intl';

import { trpc } from '@/lib/trpc/client';
import { ListingGrid } from '@/components/listing/ListingGrid';
import { ListingFilters } from '@/components/listing/ListingFilters';
import { useFilters } from '@/hooks/useFilters';
import { useDebounce } from '@/hooks/useDebounce';

export default function ListingsPage() {
  const t = useTranslations('listing');
  const { filters, updateFilter, resetFilters } = useFilters();
  const debouncedSearch = useDebounce(filters.search, 300);

  const { data, isLoading } = trpc.listing.list.useQuery({
    search: debouncedSearch || undefined,
    category: filters.category || undefined,
    condition: filters.condition || undefined,
    minPrice: filters.minPrice || undefined,
    maxPrice: filters.maxPrice < 100000 ? filters.maxPrice : undefined,
    sortBy: filters.sortBy as 'createdAt' | 'price',
    sortOrder: filters.sortOrder as 'asc' | 'desc',
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        {t('search')}
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <ListingFilters
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : data?.items?.length ? (
            <ListingGrid listings={data.items} />
          ) : (
            <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
              {t('search')} — no results
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
