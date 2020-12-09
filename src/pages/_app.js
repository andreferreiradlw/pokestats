import { Provider } from 'react-redux'
import store from '../../redux/store'
import { fetchPokemon } from '../components/Homepage/listSlice'

export default function App({ Component, pageProps }) {
  // fetch initial pokemon list for autocomplete
  store.dispatch(fetchPokemon())

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
