import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// analytics
import PlausibleProvider from 'next-plausible';
// types
import type { AppProps } from 'next/app';
// theme
import ThemeProvider from '@/components/Theme';
// components
import PokestatsHead from '@/components/Head';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// mui
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
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

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <AppCacheProvider {...props}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <PokestatsHead />
          <PlausibleProvider domain="pokestats.gg" enabled={process.env.NODE_ENV === 'production'}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </MuiThemeProvider>
          </PlausibleProvider>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </QueryClientProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
};

export default App;
