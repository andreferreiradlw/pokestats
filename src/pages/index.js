import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPokemonList } from '../components/Homepage/homeSlice'
// components
import Homepage from '../components/Homepage'

export default function Home() {
  // fetch initial pokemon list for autocomplete
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPokemonList())
  }, [dispatch])

  return <Homepage />
}
