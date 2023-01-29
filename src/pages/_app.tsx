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
          <PlausibleProvider domain="pokestats.gg" enabled={process.env.NODE_ENV === 'production'}>
            <Component {...pageProps} />
          </PlausibleProvider>
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
