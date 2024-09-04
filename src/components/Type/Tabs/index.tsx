import { useMemo, useState, useCallback } from 'react';
// types
import type { TypePageProps } from '../index';
import type { NamedAPIResource } from 'pokenode-ts';
// helpers
import { getResourceId } from '@/helpers';
import { useTypeMoves } from '@/hooks';
// components
import InfiniteScroll from '@/components/InfiniteScroll';
import { Stack, Typography, Tabs, Tab, StackProps, Paper } from '@mui/material';
import MovesTableV2 from '@/components/MovesTableV2';

interface TypeTabsProps extends StackProps, TypePageProps {
  typeName: string;
}

const TypeTabs = ({ typeData, typeName, ...rest }: TypeTabsProps) => {
  // tab state
  const [currTab, setCurrTab] = useState<'pokemon' | 'moves'>('pokemon');

  // data
  const { pokemon, moves } = typeData;
  const { data: movesData, isLoading: isLoadingMoves } = useTypeMoves(typeData, {
    enabled: currTab === 'moves',
  });

  // Memoize the list of Pokémon to prevent unnecessary recalculations
  const pokemonList = useMemo(
    () =>
      typeData.pokemon
        .map(({ pokemon }) => {
          const id = getResourceId(pokemon.url);
          return id <= 905 ? pokemon : null;
        })
        .filter(Boolean),
    [typeData],
  );

  // Callback to handle tab changes
  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: 'pokemon' | 'moves') => {
    setCurrTab(newValue);
  }, []);

  return (
    <Stack alignItems={{ xxs: 'center', lg: 'flex-start' }} gap={4} width="100%" {...rest}>
      <Paper sx={{ padding: 2 }}>
        <Tabs value={currTab} onChange={handleTabChange} centered textColor="secondary">
          <Tab label="Pokémon" value="pokemon" />
          <Tab label="Moves" value="moves" />
        </Tabs>
      </Paper>
      {currTab === 'pokemon' ? (
        <Stack width="100%" gap={2}>
          <Typography variant="sectionTitle">{`${typeName} Type Pokémon (${pokemon.length})`}</Typography>
          <InfiniteScroll pokemonList={pokemonList as NamedAPIResource[]} />
        </Stack>
      ) : (
        <Stack width="100%" gap={2}>
          <Typography variant="sectionTitle">{`${typeName} Type Moves (${moves.length})`}</Typography>
          <MovesTableV2
            moves={movesData}
            isLoading={isLoadingMoves}
            noMovesText="No moves for current type."
          />
        </Stack>
      )}
    </Stack>
  );
};

export default TypeTabs;
