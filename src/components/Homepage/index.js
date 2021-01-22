import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LazyLoad from 'react-lazyload'
// actions
import { startLoading, stopLoading } from './homeSlice'
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
  // dispatch
  const dispatch = useDispatch()
  // redux state
  const homeState = useSelector(state => state.home)
  // data
  const { isLoading, pokemonLength } = homeState

  // start loading again when unmounts
  useEffect(() => {
    if (pokemonLength) dispatch(stopLoading())
    // on unmount
    return () => {
      dispatch(startLoading())
    }
  }, [])

  return (
    <>
      {isLoading || pokemonLength === 0 ? (
        <Loading />
      ) : (
        <>
          <Layout withGutter={false} withFooter>
            <Container height="100vh" constrained withGutter>
              <MainHeading>PokeStats</MainHeading>
              <Autocomplete />
              <LazyLoad height={200} once offset={10}>
                <Particles />
              </LazyLoad>
            </Container>
            <LazyLoad height={200} once>
              <PokemonList />
            </LazyLoad>
          </Layout>
        </>
      )}
    </>
  )
}
