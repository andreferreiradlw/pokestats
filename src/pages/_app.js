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
  // fetch initial pokemon list on app load
  useEffect(() => {
    store.dispatch(fetchPokemonList())
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            )
          },
          function (err) {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
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
