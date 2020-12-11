import Link from 'next/link'
import { useSelector, shallowEqual } from 'react-redux'
// compoennts
import { Container, Input } from './styledAutoComplete'

export default function Autocomplete() {
  const pokemonList = useSelector(
    (state) => state.home.pokemonList,
    shallowEqual
  )

  /* const mapped = pokemonList.map((pokemon, index) =>{
    pokemon.id = index
    return pokemon
  }) */

  console.log(pokemonList)

  return (
    <Container>
      <Input type="text" placeholder="Search for a Pokemon"></Input>
    </Container>
  )
}
