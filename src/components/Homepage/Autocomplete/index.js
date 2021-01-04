import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterPokemon } from '../homeSlice'
// helpers
import { removeDash } from '../../../helpers/typography'
// components
import {
  Container,
  Input,
  Button,
  ListWrapper,
  OptionWrapper,
  Option,
} from './styledAutoComplete'
// icons
import SearchIcon from '../../../assets/svg/search.svg'

export default function Autocomplete() {
  // router
  const router = useRouter()

  // dispatch
  const dispatch = useDispatch()

  // search state
  const [search, setSearch] = useState('')

  // selectors
  const filteredPokemonList = useSelector(state => state.home.filteredList)
  const pokemonListError = useSelector(state => state.home.error)

  //handle error change
  useEffect(() => {
    if (pokemonListError.status !== 'OK') {
      router.push('/404')
    }
  }, [pokemonListError.status])

  return (
    <>
      <Container
        align="stretch"
        direction="row"
        grow={false}
        margin="0 auto"
        noGutter
      >
        <Input
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            dispatch(filterPokemon(e.target.value.toLowerCase()))
          }}
          type="text"
          placeholder="Search Pokemon Name or ID"
          onKeyDown={e =>
            e.code === 'Enter' &&
            filteredPokemonList[0] !== undefined &&
            router.push(`/pokemon/${filteredPokemonList[0].name}`)
          }
        ></Input>
        <Link as={`/pokemon/${search}`} href="/pokemon/[id]">
          <Button disabled={!search}>
            <SearchIcon />
          </Button>
        </Link>
        {filteredPokemonList.length > 0 && (
          <ListWrapper>
            {filteredPokemonList.slice(0, 4).map((item, i) => (
              <Link as={`/pokemon/${item.name}`} href="/pokemon/[id]" key={i}>
                <OptionWrapper>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                  />
                  <Option>{removeDash(item.name)}</Option>
                </OptionWrapper>
              </Link>
            ))}
          </ListWrapper>
        )}
      </Container>
    </>
  )
}
