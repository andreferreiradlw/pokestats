import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import LazyLoad from 'react-lazyload'
import { AnimatePresence } from 'framer-motion'
// actions
import { fetchPokemonData, cleanData } from './pokemonSlice'
import { changeVersion } from '../Header/gameSlice'
// helpers
import { mapGenerationToGame } from '../../helpers/gameVersion'
import { removeDash } from '../../helpers/typography'
import { pageContainerVariant } from '../../helpers/animations'
// components
import Layout, { MainContainer } from '../Layout'
import Loading from '../Loading'
import Box from '../Box'
import Details from './Details'
import FeaturedImage from './FeatureImage'
import EvolutionChain from './EvolutionChain'
import Breeding from './Breeding'
import Training from './Training'
import Multipliers from './Multipliers'
import BaseStats from './BaseStats'
import Forms from './Forms'
import Moves from './Moves'
import Sprites from './Sprites'
import Navigation from './Navigation'

export default function Homepage() {
  // router
  const router = useRouter()
  // dispatch
  const dispatch = useDispatch()
  // pokemon selector
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // biology
  const pokemonBio = useSelector(state => state.pokemon.biology)
  // game version
  const gameVersion = useSelector(state => state.game.version)
  // data
  const { id, game_indices, name } = pokemonInfo.data
  const { generation, names } = pokemonBio.data

  useEffect(() => {
    // reset data on unmount
    return () => {
      dispatch(cleanData())
    }
  }, [])

  // fetch pokemon data
  useEffect(() => {
    if (router.query.id) {
      // check if previous pokemon data exists
      if (Object.keys(pokemonInfo.data).length !== 0) {
        // reset data
        dispatch(cleanData())
      }
      // fetch new pokemon data
      dispatch(fetchPokemonData(router.query.id))
    }
  }, [router])

  // update game version for current Pokemon
  useEffect(() => {
    if (game_indices && game_indices[0]) {
      // change to first game indice
      if (gameVersion !== game_indices[0].version.name)
        dispatch(changeVersion(game_indices[0].version.name))
    } else if (generation) {
      // if no game indice avaliable change to generation
      let gameGen = mapGenerationToGame(generation.name)
      if (gameVersion !== gameGen) dispatch(changeVersion(gameGen))
    }
  }, [generation])

  // error handling
  useEffect(() => {
    if (pokemonInfo.error.status !== 'OK' || id > 809) {
      router.push('/404', router.asPath)
    }
  }, [pokemonInfo])

  return (
    <Layout
      withHeader
      withFooter={!pokemonInfo.isLoading}
      withMain={false}
      key={`layout-pokemon`}
    >
      <AnimatePresence exitBeforeEnter>
        {pokemonInfo.isLoading && (
          <Loading
            passKey={`loading-pokemon-${router.query.id}`}
            key={`loading-pokemon-${router.query.id}`}
            text={router.query.id && `Loading ${removeDash(router.query.id)}`}
          />
        )}
        {!pokemonInfo.isLoading && (
          <MainContainer
            constrained
            withGutter
            initial="hidden"
            animate="visible"
            exit="fade"
            variants={pageContainerVariant}
            key={`pokemon-${router.query.id}`}
          >
            <Box
              as="section"
              direction={{ xxs: 'column-reverse', lg: 'row' }}
              align="center"
              justify="flex-start"
              margin="1rem 0"
              minHeight="533px"
            >
              <Details
                sizes={5}
                margin={{ xxs: '0 0 2rem', lg: '0' }}
                key={`pokemon-details-${id}`}
              />
              <FeaturedImage
                sizes={7}
                margin={{ xxs: '0 0 2rem', lg: '0' }}
                pokemonNames={names}
                pokemonName={name}
                pokemonId={id}
              />
            </Box>
            {/** EVOLUTION CHAIN */}
            <Box
              as="section"
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
              minHeight="375px"
            >
              <LazyLoad height={375} once offset={50}>
                <EvolutionChain
                  sizes={12}
                  margin="0 0 2rem"
                  key={`pokemon-evolution-${id}`}
                />
              </LazyLoad>
            </Box>
            {/** BREEDING, TRAINING, MULTIPLIERS */}
            <Box
              as="section"
              direction={{ xxs: 'column', lg: 'row' }}
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
              minHeight="347px"
            >
              <Breeding
                margin={{ xxs: '0 0 2rem', lg: '0' }}
                padding={{ xxs: '0', lg: '0 2rem 0 0' }}
              />
              <Training
                margin={{ xxs: '0 0 2rem', lg: '0' }}
                padding={{ xxs: '0', lg: '0 1rem' }}
              />
              <Multipliers
                margin={{ xxs: '0 0 2rem', lg: '0' }}
                padding={{ xxs: '0', lg: '0 0 0 2rem' }}
              />
            </Box>
            {/** BASESTATS, FORMS */}
            <Box
              as="section"
              direction={{ xxs: 'column', lg: 'row' }}
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
            >
              <BaseStats
                sizes={{ xxs: 12, lg: 8 }}
                margin={{ xxs: '0 0 2rem', lg: '0' }}
                padding={{ xxs: '0', lg: '0 2rem 0 0' }}
              />
              <Forms sizes={{ xxs: 12, lg: 4 }} />
            </Box>
            {/** MOVES */}
            <Box
              as="section"
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
              minHeight="210px"
            >
              <LazyLoad once offset={500}>
                <Moves sizes={12} margin="0 0 2rem" />
              </LazyLoad>
            </Box>
            {/** SPRITES */}
            <Box
              as="section"
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
            >
              <LazyLoad height={800} once offset={350}>
                <Sprites sizes={12} margin="0 0 2rem" />
              </LazyLoad>
            </Box>
            {/** NAVIGATION */}
            <Box
              as="section"
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
            >
              <Navigation sizes={12} margin="0 0 2rem" />
            </Box>
          </MainContainer>
        )}
      </AnimatePresence>
    </Layout>
  )
}
