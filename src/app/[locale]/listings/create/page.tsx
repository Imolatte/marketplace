'use client';

import { Container, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        {t('createListing')}
      </Typography>
      <ListingForm
        onSubmit={(data) =>
          createListing.mutate({
            ...data,
            price: Math.round(data.price * 100),
          })
        }
        isLoading={createListing.isPending}
      />
    </Container>
  );
}
