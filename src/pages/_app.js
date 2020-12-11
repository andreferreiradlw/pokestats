import { Provider } from 'react-redux'
import store from '../../redux/store'
import ThemeProvider from '../components/Theme'
import { fetchPokemonList } from '../components/Homepage/homeSlice'

export default function App({ Component, pageProps }) {
  // fetch initial pokemon list for autocomplete
  store.dispatch(fetchPokemonList())

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
