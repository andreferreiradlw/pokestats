import { useState, useEffect, useMemo } from 'react';
// types
import type { Pokemon } from '@/types';
// helpers
import { usePlausible } from 'next-plausible';
import { generationOptions, mapIdToGeneration } from '@/helpers';
// components
import { Grid, GridProps, Typography } from '@mui/material';
import InfiniteScroll from '@/components/InfiniteScroll';
import DropdownV2 from '@/components/DropdownV2';

interface PokemonListProps extends GridProps {
  pokemon: Pokemon[];
}

const PokemonList = ({ pokemon, ...rest }: PokemonListProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  // Initialize state
  const [gen, setGen] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('id');

  useEffect(() => {
    // Retrieve session storage state when component mounts
    const storedGen = sessionStorage.getItem('genSelect');
    const storedSortBy = sessionStorage.getItem('sortSelect');
    // update state with defaults if they exist from session state
    if (storedGen) setGen(storedGen);
    if (storedSortBy) setSortBy(storedSortBy);
  }, []);

  const filteredPokemon = useMemo(() => {
    if (gen === 'all') return pokemon;
    return pokemon.filter(p => gen === mapIdToGeneration(p.id));
  }, [gen, pokemon]);

  const sortedAndFilteredPokemon = useMemo(() => {
    return [...filteredPokemon].sort((a, b) => {
      if (a[sortBy as keyof Pokemon] > b[sortBy as keyof Pokemon]) return 1;
      if (a[sortBy as keyof Pokemon] < b[sortBy as keyof Pokemon]) return -1;
      return 0;
    });
  }, [filteredPokemon, sortBy]);

  return (
    <Grid container {...rest}>
      <Typography variant="sectionTitle">{`Select your Pokemon (${sortedAndFilteredPokemon.length})`}</Typography>
      <Grid item container flexDirection="row" flexWrap="wrap" gap={{ xs: '1em', md: '2em' }}>
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
      {sortedAndFilteredPokemon.length > 0 && (
        <InfiniteScroll item pokemonList={sortedAndFilteredPokemon} />
      )}
    </Grid>
  );
};

export default PokemonList;
