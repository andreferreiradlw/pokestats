import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// helpers
import { removeDash, typeList } from '../../helpers'
// components
import {
  Container,
  Input,
  OptionSelect,
  ListWrapper,
  OptionWrapper,
  Option,
  PokeID,
} from './styledAutoComplete'

export default function Autocomplete({
  align = 'stretch',
  direction = 'row',
  grow = false,
  margin = '0 auto',
  noGutter = true,
  ...rest
}) {
  // router
  const router = useRouter()
  // selectors
  const pokemonListError = useSelector(state => state.home.error)
  const pokemonList = useSelector(state => state.home.pokemon)

  // select options
  const searchOptions = [
    { name: 'Pokemon', value: 'pokemon' },
    { name: 'Type', value: 'type' },
  ]

  // option State
  const [searchOption, setSearchOption] = useState('pokemon')
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
  const resetStates = () => {
    setSearch('')
    setFiltered([])
    setActiveOption(-1)
  }

  // reset states
  useEffect(() => {
    // on load
    resetStates()
    // unmount
    return () => resetStates()
  }, [])

  // input changes
  const handleInputChange = e => {
    setSearch(e.target.value)
    handleFilter(e.target.value.toLowerCase())
  }

  // filter by option
  const handleFilter = value => {
    if (value) {
      if (searchOption === 'pokemon') {
        // filter by pokemon
        filterItems(pokemonList, value)
      } else if (searchOption === 'type') {
        // filter by type
        filterItems(typeList, value)
      }
    } else {
      // set filtered state to empty array
      setFiltered([])
    }
  }
  // filter
  const filterItems = (itemList, filterValue) => {
    // filter by type
    const filteredList = itemList.filter(
      item =>
        removeDash(item.name).toLowerCase().includes(filterValue) ||
        item.id.toString().includes(filterValue.toString())
    )
    // update filtered state with first 4 options
    setFiltered(filteredList.slice(0, 4))
  }

  // key pressed
  const handleKeyDown = e => {
    // enter
    if (e.keyCode === 13 && filtered[0] !== undefined) {
      activeOption === -1
        ? // trigger router for first suggestion
          router.push(`/${searchOption}/${filtered[0].name}`)
        : // trigger router for active option
          router.push(`/${searchOption}/${filtered[activeOption].name}`)
      // clean filtered state
      resetStates()
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
    } else {
      // reset active option
      setActiveOption(-1)
    }
  }

  return (
    <Container
      align={align}
      direction={direction}
      grow={grow}
      margin={margin}
      noGutter={noGutter}
      {...rest}
    >
      <label htmlFor="autocomplete" id="autocomplete_label" aria-hidden="true">
        {`${removeDash(searchOption)} Name or ID`}
      </label>
      <Input
        type="text"
        placeholder={`${removeDash(searchOption)} Name or ID`}
        id="autocomplete"
        aria-labelledby="autocomplete_label"
        value={search}
        onChange={e => handleInputChange(e)}
        onKeyDown={e => handleKeyDown(e)}
      />
      <label id="search_options" htmlFor="search_options_select">
        Select Option
      </label>
      <OptionSelect
        aria-labelledby="search_options"
        id="search_options_select"
        value={searchOption}
        onChange={e => {
          resetStates()
          setSearchOption(e.target.value)
        }}
      >
        {searchOptions.map(({ name, value }, index) => (
          <option key={index} value={value}>
            {name}
          </option>
        ))}
      </OptionSelect>
      {/** display filtered list */}
      {filtered.length > 0 && (
        <ListWrapper>
          {filtered.map((item, i) => (
            <Link
              as={`/${searchOption}/${item.name}`}
              href={`/${searchOption}/[${searchOption}Id]`}
              passHref
              key={`${item.id}-${item.name}-${i}`}
            >
              <OptionWrapper
                onClick={() => resetStates()}
                onFocus={() => setActiveOption(i)}
                onKeyDown={e => handleKeyDown(e)}
                ref={listOption =>
                  listOption && i === activeOption && listOption.focus()
                }
              >
                {searchOption === 'pokemon' && (
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                  />
                )}
                <Option>{removeDash(item.name)}</Option>
                <PokeID>{`#${item.id}`}</PokeID>
              </OptionWrapper>
            </Link>
          ))}
        </ListWrapper>
      )}
    </Container>
  )
}
