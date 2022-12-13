import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// types
import { AppProps } from 'next/app';
// redux
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { fetchPokemonList } from '@/components/Homepage/homeSlice';
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

    // register service worker
    if (process.env.NODE_ENV !== 'development' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/pokeapi-sw.js')
          .then(() => console.log('PokeStats service worker registered.'))
          .catch(err => console.dir(err));
      });
    }
    // fetch initial pokemon list on app load
    // @ts-ignore
    store.dispatch(fetchPokemonList());

    // Unassign event listener
    return () => {
      nextRouter.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
