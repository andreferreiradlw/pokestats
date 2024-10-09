'use client';

import type { ReactNode } from 'react';
// helpers
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// mui
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
// contexts
import { GameVersionProvider, ThemeContextProvider } from '@/context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => (
  <AppRouterCacheProvider>
    <QueryClientProvider client={queryClient}>
      <GameVersionProvider>
        <ThemeContextProvider>
          {children}
          <CssBaseline />
        </ThemeContextProvider>
      </GameVersionProvider>
    </QueryClientProvider>
  </AppRouterCacheProvider>
);

export default Providers;
