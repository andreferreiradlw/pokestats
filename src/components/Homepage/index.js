import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
// redux actions
import { startLoading, stopLoading } from './homeSlice'
// heplpers
import {
  staggerInitialVariant,
  fadeInUpVariant,
} from '../../helpers/animations'
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
    if (pokemonLength && isLoading) dispatch(stopLoading())
    // on unmount
    return () => {
      dispatch(startLoading())
    }
  }, [])

  return (
    <Layout withGutter={false} withFooter key="homepage-layout">
      <AnimatePresence exitBeforeEnter>
        {(isLoading || pokemonLength === 0) && (
          <Loading key="homepage-loading" height="100vh" />
        )}
        {(!isLoading || pokemonLength !== 0) && (
          <>
            <Container
              height="100vh"
              constrained
              withGutter
              initial="hidden"
              animate="show"
              variants={staggerInitialVariant}
              key="homepage-container"
            >
              <MainHeading variants={fadeInUpVariant} key="homepage-heading">
                PokeStats
              </MainHeading>
              <Autocomplete
                variants={fadeInUpVariant}
                key="homepage-autocomplete"
              />
            </Container>
            <PokemonList />
            <Particles />
          </>
        )}
      </AnimatePresence>
    </Layout>
  )
}
