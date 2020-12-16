import { useSelector } from 'react-redux'
// components
import { Heading } from './styledHomepage'
import Box from '../Box'
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
          <Box as="main" constrained margin="auto" height="100vh">
            <Heading>PokeStats</Heading>
            <Autocomplete />
          </Box>
          <Particles />
        </>
      )}
    </>
  )
}
