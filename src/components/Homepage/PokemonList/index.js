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
  // select state
  const [gen, setGen] = useState('all')

  useEffect(() => {
    setShowPokemon([])

    if (gen && gen !== 'all') {
      const filteredPokemon = pokemon.filter(
        pokemon => gen === mapIdToGeneration(pokemon.id)
      )
      // show state
      setShowPokemon(filteredPokemon)
    } else {
      setShowPokemon(pokemon)
    }
  }, [gen, pokemon])

  return (
    <>
      {showPokemon && (
        <Container>
          <Box
            constrained
            withGutter
            margin="3rem 0"
            align="flex-start"
            justify="flex-start"
          >
            <SectionTitle>{`Select your Pokemon (${showPokemon.length})`}</SectionTitle>
            <SelectContainer direction="row" justify="flex-start">
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
