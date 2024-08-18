import { useMemo, useState } from 'react';
import styled from 'styled-components';
// types
import type { TypePageProps } from '../index';
// helpers
import { AnimatePresence } from 'framer-motion';
import { hoverVariant, fadeInUpVariant, getResourceId } from '@/helpers';
// styles
import { Button, SectionTitle } from '@/components/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';
import BoxWrapper from '@/components/Box/StyledBox';
import InfiniteScroll from '@/components/InfiniteScroll';
import MovesTable from '@/components/MovesTable';
import { useTypeMoves } from '@/hooks/useTypeMoves';
import Loading from '@/components/Loading';

const TabContainer = styled(BoxWrapper)`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
`;

interface TypeTabsProps extends BoxProps, TypePageProps {
  typeName: string;
}

const TypeTabs = ({ typeData, typeName, ...rest }: TypeTabsProps) => {
  // tab state
  const [currTab, setCurrTab] = useState<'pokemon' | 'moves'>('pokemon');

  // data
  const { name, pokemon, moves } = typeData;

  const { data: movesData, isLoading } = useTypeMoves(typeData, { enabled: currTab === 'moves' });

  const pokemonList = useMemo(
    () =>
      typeData.pokemon
        .map(({ pokemon }) => {
          const id = getResourceId(pokemon.url);
          // if pokemon not gen 8
          if (id <= 905) {
            return pokemon;
          }
          return null;
        })
        .filter(Boolean),
    [typeData],
  );

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em" {...rest}>
      <Box flexdirection="row" flexjustify="space-evenly" flexwrap="wrap">
        <Button
          $active={currTab === 'pokemon'}
          onClick={() => setCurrTab('pokemon')}
          whileHover="hover"
          whileTap="tap"
          variants={hoverVariant}
          key="type-pokemon-btn"
        >
          Pokemon
        </Button>
        <Button
          $active={currTab === 'moves'}
          onClick={() => setCurrTab('moves')}
          whileHover="hover"
          whileTap="tap"
          variants={hoverVariant}
          key="type-moves-btn"
        >
          Moves
        </Button>
      </Box>
      <AnimatePresence mode="wait">
        {currTab === 'pokemon' && (
          <TabContainer
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key={`${name}-type-pokemon`}
          >
            <SectionTitle>{`${typeName} Type Pokemon (${pokemon.length})`}</SectionTitle>
            <InfiniteScroll pokemonList={pokemonList} />
          </TabContainer>
        )}
        {currTab === 'moves' && (
          <TabContainer
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key={`${name}-type-moves`}
          >
            <SectionTitle>{`${typeName} Type Moves (${moves.length})`}</SectionTitle>
            {isLoading ? <Loading /> : <MovesTable moves={movesData} />}
          </TabContainer>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default TypeTabs;
