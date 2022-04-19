import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
// helpers
import { generations, mapIdToGeneration } from '../../../helpers/gameVersion'
// components
import Box from '../../Box'
import InfiniteScroll from '../../InfiniteScroll'
// styles
import { SectionTitle, Select } from '../../BaseStyles'
import { Container, SelectContainer } from './StyledPokemonList'

export default function PokemonList() {
  // data
  const pokemon = useSelector(state => state.home.pokemon)
  // display pokemon list
  const [showPokemon, setShowPokemon] = useState([])
  // gen select state
  const [gen, setGen] = useState('all')
  // sort select state
  const [sortBy, setSortBy] = useState('id')

  const sortPokemon = (pokemonList, sortBy) =>
    [...pokemonList].sort((a, b) => {
      if (a[sortBy] > b[sortBy]) return 1
      if (a[sortBy] < b[sortBy]) return -1
      return 0
    })

  useEffect(() => {
    showPokemon?.length && setShowPokemon(sortPokemon(showPokemon, sortBy))
  }, [sortBy])

  useEffect(() => {
    setShowPokemon([])

    if (gen && gen !== 'all') {
      const filteredPokemon = pokemon.filter(
        pokemon => gen === mapIdToGeneration(pokemon.id)
      )
      // sort
      const sortedPokemon = sortPokemon(filteredPokemon, sortBy)
      // show state
      setShowPokemon(sortedPokemon)
    } else {
      setShowPokemon(pokemon)
    }
  }, [gen, pokemon])

  return (
    <>
      {showPokemon && (
        <Container>
          <Box
            $constrained
            $withGutter
            margin="3rem 0"
            align="flex-start"
            justify="flex-start"
          >
            <SectionTitle>{`Select your Pokemon (${showPokemon.length})`}</SectionTitle>
            <SelectContainer
              direction="row"
              justify={{ xxs: 'center', sm: 'flex-start' }}
              $flexWrap="wrap"
            >
              <Box direction="row" justify="flex-start" width="auto">
                <label id="generation" htmlFor="gen_select">
                  Game Generation:
                </label>
                <Select
                  light
                  aria-labelledby="generation"
                  id="gen_select"
                  value={gen}
                  onChange={e => setGen(e.target.value)}
                >
                  <option value="all">All</option>
                  {generations.map(({ genDescription, genValue }, i) => (
                    <option key={`${genValue}-${i}`} value={genValue}>
                      {genDescription}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box direction="row" justify="flex-start" width="auto">
                <label id="sorting" htmlFor="sort_pokemon">
                  Sort Pokemon:
                </label>
                <Select
                  light
                  aria-labelledby="sorting"
                  id="sort_pokemon"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="id">Number</option>
                  <option value="name">Name</option>
                </Select>
              </Box>
            </SelectContainer>
            {showPokemon.length > 0 && (
              <InfiniteScroll sizes={12} pokemonList={showPokemon} />
            )}
          </Box>
        </Container>
      )}
    </>
  )
}

// itemsPerPage={gen !== 'all' ? showPokemon.length : 98}
