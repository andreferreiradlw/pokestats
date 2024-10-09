'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
// types
import type { NamedAPIResource } from 'pokenode-ts';
// helpers
import { useUmami } from '@/hooks';
import { type GameGenValue, generationOptions, getResourceId, mapIdToGeneration } from '@/helpers';
import { fadeInUpVariant } from '@/animations';
// components
import { Grid2, Typography, type Grid2Props } from '@mui/material';
import InfiniteScroll from '@/components/InfiniteScroll';
import DropdownV2 from '@/components/DropdownV2';
import { motion } from '@/client';

interface PokemonListProps extends Grid2Props {
  pokemon: NamedAPIResource[];
}

const PokemonList = ({ pokemon, ...rest }: PokemonListProps): JSX.Element => {
  // analytics
  const { track } = useUmami();

  // states
  const [gen, setGen] = useState<'all' | GameGenValue>('all');
  const [sortBy, setSortBy] = useState<string>('id');

  useEffect(() => {
    const storedGen = sessionStorage.getItem('genSelect');
    const storedSortBy = sessionStorage.getItem('sortSelect');
    if (storedGen) setGen(storedGen as 'all' | GameGenValue);
    if (storedSortBy) setSortBy(storedSortBy);
  }, []);

  const handleGenChange = useCallback(
    (newGen: 'all' | GameGenValue) => {
      setGen(newGen);
      sessionStorage.setItem('genSelect', newGen);
      track('Homepage Generation Select', { generationSelected: newGen });
    },
    [track],
  );

  const handleSortChange = useCallback(
    (newValue: string) => {
      setSortBy(newValue);
      sessionStorage.setItem('sortSelect', newValue);
      track('Homepage Sort Select');
    },
    [track],
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
        {`Select your Pokémon (${sortedAndFilteredPokemon.length})`}
      </Typography>
      <Grid2 container wrap="wrap" gap={{ xs: 2, md: 4 }}>
        <DropdownV2<'all' | GameGenValue>
          label="Game Generation"
          options={generationOptions}
          value={gen}
          onChange={handleGenChange}
        />
        <DropdownV2
          label="Sort Pokémon"
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
