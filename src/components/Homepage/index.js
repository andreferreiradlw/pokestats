import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
// components
import Layout from '../Layout'
import Loading from '../Loading'
const Autocomplete = dynamic(() => import('../Autocomplete'))
const Particles = dynamic(() => import('../Particles'))
const PokemonList = dynamic(() => import('./PokemonList'))
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
