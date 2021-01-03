import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
// action
import { fetchPokemonData } from './pokemonSlice'
// components
import Layout from '../Layout'
import Loading from '../Loading'
import Box from '../Box'
import Details from './Details'
import Breeding from './Breeding'
import Training from './Training'
import Multipliers from './Multipliers'
import BaseStats from './BaseStats'
import Form from './Forms'
import Moves from './Moves'
// styles
import { ImageContainer, Image } from './StyledPokemon'

export default function Homepage() {
  // router
  const router = useRouter()
  // dispatch
  const dispatch = useDispatch()
  // pokemon selector
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // data
  const { id } = pokemonInfo.data

  // fetch pokemon data
  useEffect(() => {
    if (router.query.id) {
      dispatch(fetchPokemonData(router.query.id))
    }
  }, [router])

  // error handling
  useEffect(() => {
    if (pokemonInfo.error.status !== 'OK') {
      router.push('/404')
    }
  }, [pokemonInfo.error])

  return (
    <Layout withHeader>
      {pokemonInfo.isLoading ? (
        <Loading />
      ) : (
        <>
          <Box
            as="section"
            direction={{ xxs: 'column', lg: 'row' }}
            align="flex-start"
            justify="flex-start"
            margin="1rem 0"
            constrained
          >
            <Details sizes={5} margin={{ xxs: '0 0 2rem', lg: '0' }} />
            <ImageContainer sizes={7} margin={{ xxs: '0 0 2rem', lg: '0' }}>
              <Image
                src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
              />
            </ImageContainer>
          </Box>
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
            <Form sizes={{ xxs: 12, lg: 4 }} />
          </Box>
          <Box
            as="section"
            align="flex-start"
            justify="flex-start"
            margin="1rem 0"
            constrained
          >
            <Moves sizes={12} margin="0 0 2rem" />
          </Box>
        </>
      )}
    </Layout>
  )
}
