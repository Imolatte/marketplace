'use client';

import { use } from 'react';
import { Container, Typography, Box, Button, Alert, Paper } from '@mui/material';
import { CheckCircle, ShoppingBag, ArrowForward } from '@mui/icons-material';
import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.03) 0%, transparent 60%)',
      }}
    >
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        {success ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              border: '1px solid rgba(16, 185, 129, 0.15)',
              background: 'rgba(16, 185, 129, 0.02)',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <CheckCircle sx={{ fontSize: 44, color: '#10b981' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.5rem', md: '2rem' },
                letterSpacing: '-0.02em',
                mb: 1,
              }}
            >
              Payment Successful!
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', mb: 4, fontWeight: 500 }}
            >
              Order #{id} has been placed successfully.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/profile/orders" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingBag />}
                  sx={{
                    px: 3,
                    py: 1.25,
                    borderRadius: 2.5,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    boxShadow: '0 4px 16px -4px rgba(79, 70, 229, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                    },
                  }}
                >
                  View Orders
                </Button>
              </Link>
              <Link href="/listings" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 3,
                    py: 1.25,
                    borderRadius: 2.5,
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      background: 'rgba(79, 70, 229, 0.04)',
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Link>
            </Box>
          </Paper>
        ) : (
          <Alert
            severity="info"
            sx={{
              borderRadius: 3,
              py: 2,
              '& .MuiAlert-icon': { fontSize: 28 },
            }}
          >
            Processing your order...
          </Alert>
        )}
      </Container>
    </Box>
  );
}
