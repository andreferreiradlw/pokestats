import { useSelector } from 'react-redux'
// components
import Layout from '../Layout'
import Autocomplete from './Autocomplete'
import Particles from '../Particles'
import Loading from '../Loading'
// styles
import { Heading } from './styledHomepage'

export default function Homepage() {
  const loadingStatus = useSelector((state) => state.home.loading)

  return (
    <>
      {loadingStatus ? (
        <Loading />
      ) : (
        <>
          <Layout height="100vh">
            <Heading>PokeStats</Heading>
            <Autocomplete />
          </Layout>
          <Particles />
        </>
      )}
    </>
  )
}
