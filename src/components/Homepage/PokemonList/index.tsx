import { useState, useEffect, useCallback } from 'react';
// types
import type { Pokemon } from '@/types';
// helpers
import { usePlausible } from 'next-plausible';
import { generationOptions, mapIdToGeneration } from '@/helpers';
// components
import { Grid, GridProps, Typography } from '@mui/material';
// import Box, { BoxProps } from '@/components/Box';
import InfiniteScroll from '@/components/InfiniteScroll';
// styles
import DropdownV2 from '@/components/DropdownV2';

interface PokemonListProps extends GridProps {
  pokemon: Pokemon[];
}

const PokemonList = ({ pokemon, ...rest }: PokemonListProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();
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
    <Grid container {...rest}>
      <Typography variant="sectionTitle">{`Select your Pokemon (${showPokemon.length})`}</Typography>
      <Grid item flexDirection="row" flexWrap="wrap" gap={{ xs: '1em', md: '2em' }}>
        <DropdownV2
          label="Game Generation"
          options={generationOptions}
          value={gen}
          onChange={e => {
            setGen(e.target.value);
            sessionStorage.setItem('genSelect', e.target.value);
            plausible('Homepage Generation Select');
          }}
        />
        <DropdownV2
          label="Sort Pokemon"
          options={[
            { value: 'id', label: 'Number' },
            { value: 'name', label: 'Name' },
          ]}
          value={sortBy}
          onChange={e => {
            setSortBy(e.target.value);
            sessionStorage.setItem('sortSelect', e.target.value);
            plausible('Homepage Sort Select');
          }}
        />
      </Grid>
      {showPokemon.length > 0 && <InfiniteScroll screensizes={12} pokemonList={showPokemon} />}
    </Grid>
  );
};

export default PokemonList;
