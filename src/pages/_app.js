import { useEffect } from 'react'
// redux
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { fetchPokemonList } from '../components/Homepage/homeSlice'
// Theme
import ThemeProvider from '../components/Theme'
// Head
import Head from '../components/Head'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // register service worker
    if ('serviceWorker' in navigator) {
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
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
