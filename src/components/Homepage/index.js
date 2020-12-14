import { useSelector } from 'react-redux'
// component
import { Container, Heading } from './styledHomepage'
import Autocomplete from './Autocomplete'
import Particles from '../Particles'
import Loading from '../Loading'

export default function Homepage() {
  const loadingStatus = useSelector((state) => state.home.loading)

  return (
    <>
      {loadingStatus ? (
        <Loading />
      ) : (
        <>
          <Container>
            <Heading>PokeStats</Heading>
            <Autocomplete />
          </Container>
          <Particles />
        </>
      )}
    </>
  )
}
