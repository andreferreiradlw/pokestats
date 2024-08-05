import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// analytics
import PlausibleProvider from 'next-plausible';
// types
import type { AppProps } from 'next/app';
// helpers
import { pageVariant } from '@/helpers/animations';
// theme
import ThemeProvider from '@/components/Theme';
// components
import PokestatsHead from '@/components/Head';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// mui
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from '@/MuiTheme';

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  // Create a client
  const queryClient = new QueryClient();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <PokestatsHead />
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial="pageInitial"
            animate="pageAnimate"
            exit="pageExit"
            variants={pageVariant}
          >
            <PlausibleProvider
              domain="pokestats.gg"
              enabled={process.env.NODE_ENV === 'production'}
            >
              <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
              </MuiThemeProvider>
            </PlausibleProvider>
          </motion.div>
        </AnimatePresence>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
