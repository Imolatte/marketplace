'use client';

import { Container, Typography, Paper, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AddCircleOutline } from '@mui/icons-material';

import { trpc } from '@/lib/trpc/client';
import { ListingForm } from '@/components/listing/ListingForm';

export default function CreateListingPage() {
  const t = useTranslations('listing');
  const router = useRouter();
  const createListing = trpc.listing.create.useMutation({
    onSuccess: (data) => {
      router.push(`/listings/${data.id}`);
    },
  });

  return (
    <Box
      sx={{
        minHeight: '80vh',
        background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.03) 0%, transparent 400px)',
      }}
    >
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              background: 'rgba(79, 70, 229, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddCircleOutline sx={{ color: 'primary.main', fontSize: 24 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.5rem', md: '2rem' },
              letterSpacing: '-0.02em',
            }}
          >
            {t('createListing')}
          </Typography>
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          <ListingForm
            onSubmit={(data) =>
              createListing.mutate({
                ...data,
                price: Math.round(data.price * 100),
              })
            }
            isLoading={createListing.isPending}
          />
        </Paper>
      </Container>
    </Box>
  );
}
