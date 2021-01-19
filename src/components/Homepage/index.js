import { useSelector } from 'react-redux'
// components
import Layout from '../Layout'
import Autocomplete from '../Autocomplete'
import Particles from '../Particles'
import Loading from '../Loading'
import PokemonList from './PokemonList'
// styles
import { Container } from './styledHomepage'
import { MainHeading } from '../BaseStyles'

export default function Homepage() {
  const homeState = useSelector(state => state.home)

  const { isLoading, pokemonLength } = homeState

  return (
    <>
      {isLoading && !pokemonLength ? (
        <Loading />
      ) : (
        <>
          <Layout withGutter={false} withFooter>
            <Container height="100vh" constrained withGutter>
              <MainHeading>PokeStats</MainHeading>
              <Autocomplete />
              <Particles />
            </Container>
            <PokemonList />
          </Layout>
        </>
      )}
    </>
  )
}
