import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
// redux
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { fetchPokemonList } from '../components/Homepage/homeSlice'
// helpers
import { pageVariant } from '../helpers/animations'
// theme
import ThemeProvider from '../components/Theme'
// components
import Head from '../components/Head'

export default function App({ Component, pageProps, router }) {
  // on mount
  useEffect(() => {
    // register service worker
    if (
      process.env.NODE_ENV !== 'development' &&
      'serviceWorker' in navigator
    ) {
      window.addEventListener('load', function () {
        navigator.serviceWorker
          .register('/pokeapi-sw.js')
          .then(() => console.log('PokeStats service worker registered.'))
          .catch(err => console.dir(err))
      })
    }
    // fetch initial pokemon list on app load
    store.dispatch(fetchPokemonList())
  }, [])

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
  )
}
