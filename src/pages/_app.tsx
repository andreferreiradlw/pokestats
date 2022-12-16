import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// types
import type { AppProps } from 'next/app';
// helpers
import { pageVariant } from '@/helpers/animations';
import * as Fathom from 'fathom-client';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
// theme
import ThemeProvider from '@/components/Theme';
// components
import Head from '@/components/Head';

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  const nextRouter = useRouter();
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    // Initialize Fathom when the app loads
    Fathom.load(publicRuntimeConfig.NEXT_PUBLIC_ANALYTICS, {
      includedDomains: ['pokestats.gg', 'www.pokestats.gg'],
    });
    // Record a pageview when route changes
    nextRouter.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      nextRouter.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [nextRouter, publicRuntimeConfig]);

  return (
    <ThemeProvider>
      {/** @ts-ignore */}
      <Head />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={pageVariant}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
