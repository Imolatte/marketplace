'use client';

import { use } from 'react';
import { Container, Typography, Box, Button, Alert } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      {success ? (
        <>
          <CheckCircle color="success" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Order #{id} has been placed successfully.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Link href="/profile/orders" style={{ textDecoration: 'none' }}>
              <Button variant="contained">
                View Orders
              </Button>
            </Link>
            <Link href="/listings" style={{ textDecoration: 'none' }}>
              <Button variant="outlined">
                Continue Shopping
              </Button>
            </Link>
          </Box>
        </>
      ) : (
        <Alert severity="info">Processing your order...</Alert>
      )}
    </Container>
  );
}
