import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import LazyLoad from 'react-lazyload'
import { motion, AnimatePresence } from 'framer-motion'
// actions
import { fetchPokemonData, startLoading, cleanData } from './pokemonSlice'
import { changeVersion } from '../Header/gameSlice'
// helpers
import { mapGenerationToGame } from '../../helpers/gameVersion'
import { removeDash } from '../../helpers/typography'
import { pageContainerVariant } from '../../helpers/animations'
// components
import Layout from '../Layout'
import Loading from '../Loading'
import Box from '../Box'
import BoxWrapper from '../Box/StyledBox'
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
  // data
  const { id, game_indices, name } = pokemonInfo.data
  const { generation } = pokemonBio.data

  // start loading info, biology and evolution states
  useEffect(() => {
    dispatch(startLoading())
    // on unmount
    return () => {
      dispatch(startLoading())
      dispatch(cleanData())
    }
  }, [])

  // fetch pokemon data
  useEffect(() => {
    if (router.query.id) {
      // also start loading when router changes
      dispatch(startLoading())
      dispatch(fetchPokemonData(router.query.id))
    }
  }, [router])

  // update game version for current Pokemon
  useEffect(() => {
    if (game_indices && game_indices[0]) {
      // change to first game indice
      dispatch(changeVersion(game_indices[0].version.name))
    } else if (generation) {
      // if no game indice avaliable change to generation
      let gameGen = mapGenerationToGame(generation.name)
      dispatch(changeVersion(gameGen))
    }
  }, [generation])

  // error handling
  useEffect(() => {
    if (pokemonInfo.error.status !== 'OK') {
      router.push('/404', router.asPath)
    }
  }, [pokemonInfo.error])

  return (
    <Layout
      withHeader
      withFooter
      withMain={false}
      key={`layout-${router.query.id}`}
    >
      <AnimatePresence exitBeforeEnter>
        {pokemonInfo.isLoading && (
          <Loading
            passKey={`loading-pokemon-${router.query.id}`}
            text={router.query.id && `Loading ${removeDash(router.query.id)}`}
          />
        )}
        {!pokemonInfo.isLoading && (
          <BoxWrapper
            forwardedAs="main"
            variants={pageContainerVariant}
            initial="hidden"
            animate="visible"
            key={`pokemon-${router.query.id}`}
            constrained
            direction="column"
            align="center"
            justify="center"
            margin="0 auto"
            width="100%"
          >
            <Box
              as="section"
              direction={{ xxs: 'column-reverse', lg: 'row' }}
              align="center"
              justify="flex-start"
              margin="1rem 0"
            >
              <Details sizes={5} margin={{ xxs: '0 0 2rem', lg: '0' }} />
              <FeaturedImage
                sizes={7}
                margin={{ xxs: '0 0 2rem', lg: '0' }}
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
            >
              <EvolutionChain sizes={12} margin="0 0 2rem" />
            </Box>
            {/** BREEDING, TRAINING, MULTIPLIERS */}
            <Box
              as="section"
              direction={{ xxs: 'column', lg: 'row' }}
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
              constrained
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
              constrained
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
              constrained
            >
              <Moves sizes={12} margin="0 0 2rem" />
            </Box>
            {/** SPRITES */}
            <Box
              as="section"
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
              constrained
            >
              <Sprites sizes={12} margin="0 0 2rem" />
            </Box>
            {/** NAVIGATION */}
            <Box
              as="section"
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
              constrained
            >
              <Navigation sizes={12} margin="0 0 2rem" />
            </Box>
          </BoxWrapper>
        )}
      </AnimatePresence>
    </Layout>
  )
}
