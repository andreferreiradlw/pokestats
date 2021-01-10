import { useSelector } from 'react-redux'
// components
import Layout from '../Layout'
import Autocomplete from '../Autocomplete'
import Particles from '../Particles'
import Loading from '../Loading'
import InfiniteScroll from './InfiniteScroll'
// styles
import { Container, Heading } from './styledHomepage'

export default function Homepage() {
  const loadingStatus = useSelector(state => state.home.loading)

  return (
    <>
      {loadingStatus ? (
        <Loading />
      ) : (
        <>
          <Layout withGutter={false} withFooter>
            <Container height="100vh" constrained withGutter>
              <Heading>PokeStats</Heading>
              <Autocomplete />
              <Particles />
            </Container>
            <InfiniteScroll />
          </Layout>
        </>
      )}
    </>
  )
}
