// types
import type { AppProps } from 'next/app';
// helpers
import { pageVariant } from '@/helpers/animations';
import getConfig from 'next/config';
// theme
import ThemeProvider from '@/components/Theme';
// components
import Script from 'next/script';
import PokestatsHead from '@/components/Head';
import { AnimatePresence, motion } from 'framer-motion';

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  const { publicRuntimeConfig } = getConfig();

  return (
    <ThemeProvider>
      <Script
        src="https://instant-the-passenger.pokestats.gg/script.js"
        data-site={publicRuntimeConfig?.NEXT_PUBLIC_ANALYTICS}
        defer
      />
      <PokestatsHead />
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
