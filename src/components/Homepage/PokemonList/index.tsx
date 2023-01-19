import { useState, useEffect, useCallback } from 'react';
// types
import type { Pokemon } from '@/types';
// helpers
import { generations, mapIdToGeneration } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
import InfiniteScroll from '@/components/InfiniteScroll';
import Dropdown from '@/components/Dropdown';
// styles
import { SectionTitle } from '@/components/BaseStyles';
import { SelectContainer } from './StyledPokemonList';

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
  // memo
  const sortItems = useCallback(
    (list: Pokemon[], sortProperty: string): Pokemon[] =>
      [...list].sort((a, b) => {
        if (a[sortProperty] > b[sortProperty]) return 1;
        if (a[sortProperty] < b[sortProperty]) return -1;
        return 0;
      }),
    [],
  );
  const filterByGen = useCallback(
    (pokemonToFilter: Pokemon[]): Pokemon[] =>
      pokemonToFilter.filter(pokemon => gen === mapIdToGeneration(pokemon.id)),
    [gen],
  );

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
      const filteredPokemon = filterByGen(pokemon);
      setShowPokemon(sortItems(filteredPokemon, sortBy));
    } else {
      setShowPokemon(sortItems(pokemon, sortBy));
    }
  }, [gen, pokemon, sortBy]);

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1.5em" {...rest}>
      <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1.5em">
        <SectionTitle>{`Select your Pokemon (${showPokemon.length})`}</SectionTitle>
        <SelectContainer
          flexdirection="row"
          flexjustify={{ xxs: 'center', sm: 'flex-start' }}
          flexwrap="wrap"
          flexgap="2em"
        >
          <Dropdown
            label="Game Generation"
            options={[{ value: 'all', label: 'All' }, ...generations]}
            value={gen}
            onChange={e => {
              setGen(e.target.value);
              sessionStorage.setItem('genSelect', e.target.value);
            }}
            sizeSmall
            minWidth="175px"
          />
          <Dropdown
            label="Sort Pokemon"
            options={[
              { value: 'id', label: 'Number' },
              { value: 'name', label: 'Name' },
            ]}
            value={sortBy}
            onChange={e => {
              setSortBy(e.target.value);
              sessionStorage.setItem('sortSelect', e.target.value);
            }}
            sizeSmall
            minWidth="125px"
          />
        </SelectContainer>
      </Box>
      {showPokemon.length > 0 && <InfiniteScroll screensizes={12} pokemonList={showPokemon} />}
    </Box>
  );
};

export default PokemonList;
