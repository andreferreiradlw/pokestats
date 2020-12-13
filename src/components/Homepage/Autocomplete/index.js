import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterPokemon } from '../homeSlice'
// components
import {
  Container,
  Input,
  Button,
  Wrapper,
  WrapperOption,
} from './styledAutoComplete'
// icons
import SearchIcon from '../../../../public/images/search.svg'

// capitalise 1st letter of the string
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export default function Autocomplete() {
  // router
  const router = useRouter()

  // dispatch
  const dispatch = useDispatch()

  // search state
  const [search, setSearch] = useState('')

  // selectors
  const filteredPokemonList = useSelector((state) => state.home.filteredList)
  const pokemonListError = useSelector((state) => state.home.error)

  //handle error change
  useEffect(() => {
    if (pokemonListError.status !== 'OK') {
      router.push('/404')
    }
  }, [pokemonListError.status])

  return (
    <>
      <Container>
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            dispatch(filterPokemon(e.target.value))
          }}
          type="text"
          placeholder="Search Pokemon Name or ID"
        />
        <Link as={`/pokemon/${search}`} href="/pokemon/[id]">
          <Button disabled={!search}>
            <SearchIcon />
          </Button>
        </Link>
        {filteredPokemonList.length > 0 && (
          <Wrapper>
            {filteredPokemonList.slice(0, 4).map((item, i) => (
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
