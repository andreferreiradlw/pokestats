import { useState, useEffect } from 'react';
// types
import type { Pokemon } from '@/types';
import type { BoxProps } from '@/components/Box';
// helpers
import { generations, mapIdToGeneration } from '@/helpers';
// components
import Box from '@/components/Box';
import InfiniteScroll from '@/components/InfiniteScroll';
// styles
import { SectionTitle, Select } from '@/components/BaseStyles';
import { Container, SelectContainer } from './StyledPokemonList';

const sortItems = (list: Pokemon[], sortProperty: string): Pokemon[] =>
  [...list].sort((a, b) => {
    if (a[sortProperty] > b[sortProperty]) return 1;
    if (a[sortProperty] < b[sortProperty]) return -1;
    return 0;
  });

interface PokemonListProps extends BoxProps {
  pokemon: Pokemon[];
}

const PokemonList = ({ pokemon, ...rest }: PokemonListProps): JSX.Element => {
  // display pokemon list
  const [showPokemon, setShowPokemon] = useState<Pokemon[]>(pokemon);
  // gen select state
  const [gen, setGen] = useState('all');
  // sort select state
  const [sortBy, setSortBy] = useState('id');

  useEffect(() => {
    // Access initial value from session storage
    const genSelect = sessionStorage.getItem('genSelect');
    const sortSelect = sessionStorage.getItem('sortSelect');
    // update states
    if (genSelect) setGen(genSelect);
    if (sortSelect) setSortBy(sortSelect);
  }, []);

  useEffect(() => {
    if (gen !== 'all') {
      const filteredPokemon = pokemon.filter(pokemon => gen === mapIdToGeneration(pokemon.id));

      setShowPokemon(sortItems(filteredPokemon, sortBy));
    } else {
      setShowPokemon(sortItems(pokemon, sortBy));
    }
  }, [gen, pokemon, sortBy]);

  return (
    <Container {...rest}>
      <Box
        $constrained
        $withGutter
        flexmargin="3rem 0"
        flexalign="flex-start"
        flexjustify="flex-start"
        flexgap="1em"
      >
        <SectionTitle>{`Select your Pokemon (${showPokemon.length})`}</SectionTitle>
        <SelectContainer
          flexdirection="row"
          flexjustify={{ xxs: 'center', sm: 'flex-start' }}
          flexwrap="wrap"
        >
          <Box flexdirection="row" flexjustify="flex-start" width="auto">
            <label id="generation" htmlFor="gen_select">
              Game Generation:
            </label>
            <Select
              light
              aria-labelledby="generation"
              id="gen_select"
              value={gen}
              onChange={e => {
                setGen(e.target.value);
                sessionStorage.setItem('genSelect', e.target.value);
              }}
            >
              <option value="all">All</option>
              {generations.map(({ genDescription, genValue }, i) => (
                <option key={`${genValue}-${i}`} value={genValue}>
                  {genDescription}
                </option>
              ))}
            </Select>
          </Box>
          <Box flexdirection="row" flexjustify="flex-start" width="auto">
            <label id="sorting" htmlFor="sort_pokemon">
              Sort Pokemon:
            </label>
            <Select
              light
              aria-labelledby="sorting"
              id="sort_pokemon"
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value);
                sessionStorage.setItem('sortSelect', e.target.value);
              }}
            >
              <option value="id">Number</option>
              <option value="name">Name</option>
            </Select>
          </Box>
        </SelectContainer>
        {showPokemon.length > 0 && <InfiniteScroll screensizes={12} pokemonList={showPokemon} />}
      </Box>
    </Container>
  );
};

export default PokemonList;
