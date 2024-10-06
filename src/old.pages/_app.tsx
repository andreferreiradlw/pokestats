// types
import type { AppProps } from 'next/app';
// mui
import CssBaseline from '@mui/material/CssBaseline';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
// context providers
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PlausibleProvider from 'next-plausible';
import { GameVersionProvider, LoaderProvider, ThemeContextProvider } from '@/context';
// components
import PageLoader from '@/components/PageLoader';

const App = (props: AppProps): JSX.Element => {
  // props
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
          <LoaderProvider>
            <GameVersionProvider pokemon={pageProps?.species}>
              <ThemeContextProvider>
                <CssBaseline />
                <PageLoader />
                <Component {...pageProps} />
              </ThemeContextProvider>
            </GameVersionProvider>
          </LoaderProvider>
        </PlausibleProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </AppCacheProvider>
  );
};

export default App;
