import Link from 'next/link'
import { useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
// components
import {
  Container,
  Input,
  Button,
  Wrapper,
  WrapperOption,
} from './styledAutoComplete'
import SearchIcon from '../../../../public/images/search.svg'

// capitalise 1st letter of the string
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export default function Autocomplete() {
  // get fetched pokemon list from api
  const pokemonList = useSelector(
    (state) => state.home.pokemonList,
    shallowEqual
  )
  // states
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  const filterPokemon = (value) => {
    if (value) {
      // filter pokemon by name
      const filteredList = pokemonList.filter((pokemon) =>
        pokemon.name.includes(value)
      )
      // set filtered state
      setFiltered(filteredList)
    } else {
      // set filtered state to empty array
      setFiltered([])
    }
  }

  return (
    <>
      <Container>
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            filterPokemon(e.target.value)
          }}
          type="text"
          placeholder="Search Pokemon name or ID"
        />
        <Link as={`/pokemon/${search}`} href="/pokemon/[id]">
          <Button disabled={!search}>
            <SearchIcon />
          </Button>
        </Link>
        {filtered.length > 0 && (
          <Wrapper>
            {filtered.slice(0, 4).map((item, i) => (
              <Link as={`/pokemon/${item.name}`} href="/pokemon/[id]" key={i}>
                <WrapperOption>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                  />
                  {capitalize(item.name)}
                </WrapperOption>
              </Link>
            ))}
          </Wrapper>
        )}
      </Container>
    </>
  )
}
