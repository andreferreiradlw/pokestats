import { useSelector } from 'react-redux'
// component
import { Container, Heading } from './styledHomepage'
import Autocomplete from './Autocomplete'
import Particles from '../Particles'

export default function Homepage() {
  const loadingStatus = useSelector((state) => state.home.loading)

  return (
    <>
      {loadingStatus ? (
        <div>Loading!</div>
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
