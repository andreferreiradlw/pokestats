import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// analytics
import PlausibleProvider from 'next-plausible';
// types
import type { AppProps } from 'next/app';
// components
import PokestatsHead from '@/components/Head';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// mui
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/MuiTheme';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';

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
        <PokestatsHead />
        <PlausibleProvider domain="pokestats.gg" enabled={process.env.NODE_ENV === 'production'}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </PlausibleProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
    </AppCacheProvider>
  );
};

export default App;
