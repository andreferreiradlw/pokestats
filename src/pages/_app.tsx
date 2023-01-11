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
      <Script
        async
        defer
        id="waa"
        data-waa-late-init="true"
        src={`https://stats.wideangle.co/script/${publicRuntimeConfig?.NEXT_PUBLIC_ANALYTICS}.js`}
      />
      <Script type="application/javascript">
        {`var waaScript = document.querySelector('#waa');
  waaScript.addEventListener('load', function() {
    waaCreate().then(waa => { window.waa = waa; });
  });`}
      </Script>
    </ThemeProvider>
  );
};

export default App;
