'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import superjson from 'superjson';

import { trpc } from '@/lib/trpc/client';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#7c3aed',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 5 * 1000 } },
  }));

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
