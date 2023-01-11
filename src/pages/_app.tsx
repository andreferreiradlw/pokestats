// types
import type { AppProps } from 'next/app';
// helpers
import { pageVariant } from '@/helpers/animations';
// theme
import ThemeProvider from '@/components/Theme';
// components
import Script from 'next/script';
import PokestatsHead from '@/components/Head';
import { AnimatePresence, motion } from 'framer-motion';

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  return (
    <ThemeProvider>
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
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <noscript>
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
    </ThemeProvider>
  );
};

export default App;
