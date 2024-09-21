import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// analytics
import PlausibleProvider from 'next-plausible';
// types
import type { AppProps } from 'next/app';
// components
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// mui
import CssBaseline from '@mui/material/CssBaseline';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { GameVersionProvider, ThemeContextProvider } from '@/context';

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <AppCacheProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <PlausibleProvider domain="pokestats.gg" enabled={process.env.NODE_ENV === 'production'}>
          <GameVersionProvider pokemon={pageProps?.species}>
            <ThemeContextProvider>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeContextProvider>
          </GameVersionProvider>
        </PlausibleProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </AppCacheProvider>
  );
};

export default App;
