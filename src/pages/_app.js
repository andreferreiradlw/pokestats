import { Provider } from 'react-redux'
import store from '../../redux/store'
// Theme
import ThemeProvider from '../components/Theme'
// Head
import Head from '../components/Head'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Head />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
