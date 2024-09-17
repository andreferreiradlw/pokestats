import { useState, useEffect, useMemo, useCallback } from 'react';
// types
import type { NamedAPIResource } from 'pokenode-ts';
// helpers
import { usePlausible } from 'next-plausible';
import { generationOptions, getResourceId, mapIdToGeneration } from '@/helpers';
import { fadeInUpVariant } from '@/animations';
// components
import type { Grid2Props, SelectChangeEvent } from '@mui/material';
import { Grid2, Typography } from '@mui/material';
import InfiniteScroll from '@/components/InfiniteScroll';
import DropdownV2 from '@/components/DropdownV2';
import { motion } from 'framer-motion';

interface PokemonListProps extends Grid2Props {
  pokemon: NamedAPIResource[];
}

const PokemonList = ({ pokemon, ...rest }: PokemonListProps): JSX.Element => {
  const plausible = usePlausible();

  const [gen, setGen] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('id');

  useEffect(() => {
    const storedGen = sessionStorage.getItem('genSelect');
    const storedSortBy = sessionStorage.getItem('sortSelect');
    if (storedGen) setGen(storedGen);
    if (storedSortBy) setSortBy(storedSortBy);
  }, []);

  const handleGenChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      const value = e.target.value;
      setGen(value);
      sessionStorage.setItem('genSelect', value);
      plausible('Homepage Generation Select');
    },
    [plausible],
  );

  const handleSortChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      const value = e.target.value;
      setSortBy(value);
      sessionStorage.setItem('sortSelect', value);
      plausible('Homepage Sort Select');
    },
    [plausible],
  );

  const filteredPokemon = useMemo(() => {
    return gen === 'all'
      ? pokemon
      : pokemon.filter(p => gen === mapIdToGeneration(getResourceId(p.url)));
  }, [gen, pokemon]);

  const sortedAndFilteredPokemon = useMemo(() => {
    const sortedPokemon = filteredPokemon.slice().sort((a, b) => {
      const aValue = sortBy === 'id' ? getResourceId(a.url) : a.name.toLowerCase();
      const bValue = sortBy === 'id' ? getResourceId(b.url) : b.name.toLowerCase();
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    });

    return sortedPokemon;
  }, [filteredPokemon, sortBy]);

  return (
    <Grid2
      container
      direction="column"
      gap={4}
      component={motion.div}
      initial="hidden"
      animate="show"
      variants={fadeInUpVariant}
      {...rest}
    >
      <Typography variant="sectionTitle">
        {`Select your Pokemon (${sortedAndFilteredPokemon.length})`}
      </Typography>
      <Grid2 container wrap="wrap" gap={{ xs: 2, md: 4 }}>
        <DropdownV2
          label="Game Generation"
          options={generationOptions}
          value={gen}
          onChange={handleGenChange}
        />
        <DropdownV2
          label="Sort Pokemon"
          options={[
            { value: 'id', label: 'Number' },
            { value: 'name', label: 'Name' },
          ]}
          value={sortBy}
          onChange={handleSortChange}
        />
      </Grid2>
      {sortedAndFilteredPokemon.length > 0 && (
        <InfiniteScroll pokemonList={sortedAndFilteredPokemon} />
      )}
    </Grid2>
  );
};

export default PokemonList;
