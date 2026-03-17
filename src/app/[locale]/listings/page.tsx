'use client';

import { Container, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Inbox } from '@mui/icons-material';

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
    <Box
      sx={{
        minHeight: '80vh',
        background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.03) 0%, transparent 300px)',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Typography
          variant="h3"
          className="animate-fade-in-up"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            letterSpacing: '-0.02em',
            mb: { xs: 3, md: 4 },
          }}
        >
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
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
                <CircularProgress sx={{ color: 'primary.main' }} />
              </Box>
            ) : data?.items?.length ? (
              <ListingGrid listings={data.items} />
            ) : (
              <Box
                sx={{
                  py: 12,
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
                  <Inbox sx={{ fontSize: 32, color: 'primary.main' }} />
                </Box>
                <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                  {t('search')} — no results
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
