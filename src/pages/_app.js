import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// redux
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { fetchPokemonList } from '../components/Homepage/homeSlice';
// helpers
import { pageVariant } from '../helpers/animations';
import * as Fathom from 'fathom-client';
import { useRouter } from 'next/router';
// theme
import ThemeProvider from '../components/Theme';
// components
import Head from '../components/Head';

export default function App({ Component, pageProps, router }) {
  const nextRouter = useRouter();

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load(process.env.NEXT_PUBLIC_ANALYTICS, {
      includedDomains: ['pokestats.gg', 'www.pokestats.gg'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
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
    store.dispatch(fetchPokemonList());

    // Unassign event listener
    return () => {
      nextRouter.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Head />
        <AnimatePresence exitBeforeEnter>
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
}
