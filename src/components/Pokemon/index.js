import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
// action
import { fetchPokemonData } from './pokemonSlice'
// components
import Layout from '../Layout'
import Loading from '../Loading'
import Info from './Info'

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
    <Layout withHeader>{pokemonInfo.isLoading ? <Loading /> : <Info />}</Layout>
  )
}
