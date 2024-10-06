'use client';

import type { ReactNode } from 'react';
// helpers
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PlausibleProvider from 'next-plausible';
// mui
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
// contexts
import { GameVersionProvider, ThemeContextProvider } from '@/context';
// components
import PageLoader from '@/components/PageLoader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <QueryClientProvider client={queryClient}>
            <PlausibleProvider
              domain="pokestats.gg"
              enabled={process.env.NODE_ENV === 'production'}
            >
              <GameVersionProvider>
                <ThemeContextProvider>
                  <CssBaseline />
                  <PageLoader />
                  {children}
                </ThemeContextProvider>
              </GameVersionProvider>
            </PlausibleProvider>
          </QueryClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
