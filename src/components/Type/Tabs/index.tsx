import { useState } from 'react';
import styled from 'styled-components';
// types
import type { TypePageProps } from '../index';
// helpers
import { motion, AnimatePresence } from 'framer-motion';
import { hoverVariant, removeDash, fadeInUpVariant } from '@/helpers';
// styles
import { Button, SectionTitle } from '@/components/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';
import InfiniteScroll from '@/components/InfiniteScroll';
import TypeMoves from './Moves';

const TabContainer = styled(motion.div)`
  width: 100%;
`;

interface TypeTabsProps extends BoxProps, TypePageProps {}

const TypeTabs = ({ typeInfo, typeMoves, ...rest }: TypeTabsProps) => {
  // tab state
  const [currTab, setCurrTab] = useState('pokemon');
  // data
  const { name, pokemon } = typeInfo;

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <Box direction="row" justify="space-evenly" $flexWrap="wrap" margin="0 0 1rem">
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
            <SectionTitle>{`${removeDash(name)} Type Pokemon (${pokemon.length})`}</SectionTitle>
            <InfiniteScroll pokemonList={pokemon} dark />
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
            <SectionTitle>{`${removeDash(name)} Type Moves (${typeMoves.length})`}</SectionTitle>{' '}
            <TypeMoves moves={typeMoves} />
          </TabContainer>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default TypeTabs;
