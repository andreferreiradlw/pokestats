import { useSelector } from 'react-redux'
// components
import Layout from '../Layout'
import Autocomplete from './Autocomplete'
import Particles from '../Particles'
import Loading from '../Loading'
import InfinityScroll from './InfinityScroll'
import Box from './../Box'
// styles
import { Heading } from './styledHomepage'

export default function Homepage() {
  const loadingStatus = useSelector(state => state.home.loading)

  return (
    <>
      {loadingStatus ? (
        <Loading />
      ) : (
        <>
          <Layout>
            <Box height="100vh">
              <Heading>PokeStats</Heading>
              <Autocomplete />
            </Box>
            <Box>
              <InfinityScroll />
            </Box>
          </Layout>
          <Particles />
        </>
      )}
    </>
  )
}
