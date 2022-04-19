import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// helpers
import { removeDash } from '../../helpers'
// styles
import {
  Container,
  Input,
  ListWrapper,
  OptionWrapper,
  OptionImg,
  Option,
  PokeID,
} from './styledAutoComplete'

export default function Autocomplete({
  align = 'stretch',
  direction = 'row',
  grow = false,
  margin = '0 auto',
  ...rest
}) {
  // router
  const router = useRouter()
  // selectors
  const pokemonListError = useSelector(state => state.home.error)
  const filterList = useSelector(state => state.home.filterList)

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
      const filteredList = filterList.filter(
        item =>
          removeDash(item.name).toLowerCase().includes(value) ||
          item.id.toString().includes(value.toString())
      )
      // update filtered state with first 4 options
      setFiltered(filteredList.slice(0, 4))
    } else {
      // set filtered state to empty array
      setFiltered([])
    }
  }

  // key pressed
  const handleKeyDown = e => {
    // enter
    if (e.keyCode === 13 && filtered[0] !== undefined) {
      activeOption === -1
        ? // trigger router for first suggestion
          router.push(`/${filtered[0].type}/${filtered[0].name}`)
        : // trigger router for active option
          router.push(
            `/${filtered[activeOption].type}/${filtered[activeOption].name}`
          )
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
      $flexGrow={grow}
      margin={margin}
      {...rest}
    >
      <label htmlFor="autocomplete" id="autocomplete_label" aria-hidden="true">
        {`Search Pokemon or Type Name`}
      </label>
      <Input
        type="text"
        placeholder={`Search Pokemon or Type Name`}
        id="autocomplete"
        aria-labelledby="autocomplete_label"
        value={search}
        onChange={e => handleInputChange(e)}
        onKeyDown={e => handleKeyDown(e)}
      />
      {/** display filtered list */}
      {filtered.length > 0 && (
        <ListWrapper>
          {filtered.map((item, i) => (
            <Link
              as={`/${item.type}/${item.name}`}
              href={`/${item.type}/[${item.type}Id]`}
              passHref
              key={`${item.type}-${item.id}-${item.name}-${i}`}
            >
              <OptionWrapper
                onClick={() => resetStates()}
                onFocus={() => setActiveOption(i)}
                onKeyDown={e => handleKeyDown(e)}
                ref={listOption =>
                  listOption && i === activeOption && listOption.focus()
                }
              >
                {item.type === 'type' && (
                  <OptionImg
                    type={item.type}
                    src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats/main/src/assets/svg/types/${item.name}.svg`}
                  />
                )}
                {item.type === 'pokemon' && (
                  <OptionImg
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
