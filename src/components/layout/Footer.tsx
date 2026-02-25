import { Box, Container, Typography, Link as MuiLink } from '@mui/material';

export function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, mt: 'auto', bgcolor: 'grey.100' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          <MuiLink color="inherit" href="/">
            SecondHand Marketplace
          </MuiLink>{' '}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}
