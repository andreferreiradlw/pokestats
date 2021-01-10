import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// helpers
import { removeDash } from '../../helpers/typography'
// components
import {
  Container,
  Input,
  ListWrapper,
  OptionWrapper,
  Option,
} from './styledAutoComplete'
// icons
import SearchIcon from '../../assets/svg/search.svg'

export default function Autocomplete() {
  // router
  const router = useRouter()
  // selectors
  const pokemonListError = useSelector(state => state.home.error)
  const pokemonList = useSelector(state => state.home.pokemon)

  //handle error change
  useEffect(() => {
    if (pokemonListError.status !== 'OK') {
      router.push('/404')
    }
  }, [pokemonListError.status])

  // search state
  const [search, setSearch] = useState('')
  // filtered state
  const [filtered, setFiltered] = useState([])

  // input changes
  const handleInputChange = e => {
    setSearch(e.target.value)
    handleFilter(e.target.value.toLowerCase())
  }

  // filter pokemon
  const handleFilter = value => {
    if (value) {
      const filteredPokemon = pokemonList.filter(pokemon =>
        pokemon.name.includes(value)
      )
      setFiltered(filteredPokemon)
    } else {
      // set filtered state to empty array
      setFiltered([])
    }
  }

  // key pressed
  const handleKeyDown = e => {
    // enter
    if (e.code === 'Enter' && filteredPokemonList[0] !== undefined) {
      router.push(`/pokemon/${filteredPokemonList[0].name}`)
    }
  }

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
          onChange={e => handleInputChange(e)}
          type="text"
          placeholder="Search Pokemon Name or ID"
          onKeyDown={e => handleKeyDown(e)}
        ></Input>
        {/** display filtered list */}
        {filtered.length > 0 && (
          <ListWrapper>
            {filtered.slice(0, 4).map((item, i) => (
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
