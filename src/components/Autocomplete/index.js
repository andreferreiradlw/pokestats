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
  PokeID,
} from './styledAutoComplete'

export default function Autocomplete() {
  // router
  const router = useRouter()
  // selectors
  const pokemonListError = useSelector(state => state.home.error)
  const pokemonList = useSelector(state => state.home.pokemon)

  // search state
  const [search, setSearch] = useState('')
  // filtered state
  const [filtered, setFiltered] = useState([])
  // active sugestion
  const [activeOption, setActiveOption] = useState(-1)

  // handle error change
  useEffect(() => {
    if (pokemonListError.status !== 'OK') {
      router.push('/404')
    }
  }, [pokemonListError.status])

  // reset states
  useEffect(() => {
    setFiltered([])
    setActiveOption(-1)

    return () => {
      setFiltered([])
      setActiveOption(-1)
    }
  }, [])

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
      // update filtered state with first 4 options
      setFiltered(filteredPokemon.slice(0, 4))
    } else {
      // set filtered state to empty array
      setFiltered([])
    }
  }

  // key pressed
  const handleKeyDown = e => {
    // enter
    if (e.code === 'Enter' && filtered[0] !== undefined) {
      activeOption === -1
        ? // trigger router for first suggestion
          router.push(`/pokemon/${filtered[0].name}`)
        : // trigger router for active option
          router.push(`/pokemon/${filtered[activeOption].name}`)
      // clean filtered state
      setFiltered([])
    } // up arrow
    else if (e.keyCode === 38) {
      // stop window from scrolling
      e.preventDefault()
      if (activeOption === -1) {
        return
      }
      // decrement the index
      setActiveOption(activeOption - 1)
    }
    // down arrow
    else if (e.keyCode === 40) {
      // stop window from scrolling
      e.preventDefault()
      if (activeOption + 1 === filtered.length) {
        // last option, do nothing
        return
      }
      // increment the index
      setActiveOption(activeOption + 1)
    }
  }

  // handle focus change
  const handleOptionFocus = index => {
    setActiveOption(index)
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
            {filtered.map((item, i) => (
              <Link
                as={`/pokemon/${item.name}`}
                href="/pokemon/[id]"
                passHref
                key={i}
              >
                <OptionWrapper
                  onFocus={e => handleOptionFocus(i)}
                  onKeyDown={e => handleKeyDown(e)}
                  ref={option => option && i === activeOption && option.focus()}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                  />
                  <Option>{removeDash(item.name)}</Option>
                  <PokeID>{`#${item.id}`}</PokeID>
                </OptionWrapper>
              </Link>
            ))}
          </ListWrapper>
        )}
      </Container>
    </>
  )
}
