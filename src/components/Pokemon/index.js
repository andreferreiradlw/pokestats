import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
// action
import { fetchPokemonData } from './pokemonSlice'
// components
import Layout from '../Layout'
import Loading from '../Loading'
import Box from '../Box'
import Info from './Info'
import Breeding from './Breeding'
import Training from './Training'
import BaseStats from './BaseStats'

export default function Homepage() {
  // router
  const router = useRouter()
  // dispatch
  const dispatch = useDispatch()
  // pokemon selector
  const pokemonInfo = useSelector((state) => state.pokemon.info)

  // fetch pokemon data
  useEffect(() => {
    const pokemon = router.query.id
    pokemon && dispatch(fetchPokemonData(pokemon))
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
          <Info />
          <Box
            as="section"
            direction={{ xxs: 'column', md: 'row' }}
            align="flex-start"
            justify="flex-start"
            margin="0 0 2rem"
            constrained
          >
            <Breeding />
            <Training />
            <Box>Typing</Box>
          </Box>
          <Box
            as="section"
            direction={{ xxs: 'column', lg: 'row' }}
            align="flex-start"
            justify="flex-start"
            margin="0 0 2rem"
            constrained
          >
            <BaseStats sizes={5} />
          </Box>
        </>
      )}
    </Layout>
  )
}
