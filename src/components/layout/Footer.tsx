import { Box, Container, Typography, Link as MuiLink, Divider } from '@mui/material';
import { Storefront } from '@mui/icons-material';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        pt: 6,
        pb: 4,
        background: 'linear-gradient(180deg, #111118 0%, #0a0a10 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 4,
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Storefront sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              SecondHand
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: { xs: 3, md: 5 },
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {['Electronics', 'Clothing', 'Home', 'Sports', 'Books'].map((cat) => (
              <MuiLink
                key={cat}
                href={`/listings?category=${cat}`}
                underline="none"
                sx={{
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  '&:hover': { color: '#fff' },
                }}
              >
                {cat}
              </MuiLink>
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.08)' }} />

        <Typography variant="body2" align="center" sx={{ fontSize: '0.8rem', color: '#6b7280' }}>
          {new Date().getFullYear()}{' '}
          <MuiLink
            color="inherit"
            href="/"
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            SecondHand Marketplace
          </MuiLink>
          . All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
