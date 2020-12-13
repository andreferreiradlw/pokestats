import { useDispatch } from 'react-redux'
import { fetchPokemonList } from '../components/Homepage/homeSlice'
// components
import Homepage from '../components/Homepage'

export default function Home() {
  // fetch initial pokemon list for autocomplete
  const dispatch = useDispatch()
  dispatch(fetchPokemonList())

  return <Homepage />
}
