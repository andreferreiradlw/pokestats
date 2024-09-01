import { useMemo, useState, useCallback } from 'react';
// types
import type { TypePageProps } from '../index';
import type { NamedAPIResource } from 'pokenode-ts';
// helpers
import { getResourceId } from '@/helpers';
import { useTypeMoves } from '@/hooks';
import { styled } from '@mui/material/styles';
import { fadeInUpVariant } from '@/animations';
// components
import { AnimatePresence, motion } from 'framer-motion';
import InfiniteScroll from '@/components/InfiniteScroll';
import MovesTable from '@/components/MovesTable';
import Loading from '@/components/Loading';
import { Stack, Typography, Tabs, Tab, StackProps, Paper } from '@mui/material';

const TabContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
`;

interface TypeTabsProps extends StackProps, TypePageProps {
  typeName: string;
}

const TypeTabs = ({ typeData, typeName, ...rest }: TypeTabsProps) => {
  // tab state
  const [currTab, setCurrTab] = useState<'pokemon' | 'moves'>('pokemon');

  // data
  const { name, pokemon, moves } = typeData;
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
      <AnimatePresence mode="wait">
        {currTab === 'pokemon' ? (
          <TabContainer
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key={`${name}-type-pokemon`}
          >
            <Typography variant="sectionTitle">{`${typeName} Type Pokemon (${pokemon.length})`}</Typography>
            <InfiniteScroll pokemonList={pokemonList as NamedAPIResource[]} />
          </TabContainer>
        ) : (
          <TabContainer
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key={`${name}-type-moves`}
          >
            <Typography variant="sectionTitle">{`${typeName} Type Moves (${moves.length})`}</Typography>
            {isLoadingMoves ? <Loading /> : movesData && <MovesTable moves={movesData} />}
          </TabContainer>
        )}
      </AnimatePresence>
    </Stack>
  );
};

export default TypeTabs;
