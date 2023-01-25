import { useMemo } from 'react';
// types
import type { PokestatsMovePageProps } from '@/pages/move/[moveId]';
import type { Pokemon } from '@/types';
// helpers
import { findEnglishName, pageContainerVariant, getIdFromURL } from '@/helpers';
// styles
import { Divider, PageHeading } from '@/BaseStyles';
// components
import { AnimatePresence } from 'framer-motion';
import { MainContainer } from '@/components/Layout';
import Box from '@/components/Box';
import TypeBadge from '@/components/TypeBadge';
import MoveInfo from './MoveInfo';
import MoveEntries from './MoveEntries';
import MoveContest from './MoveContest';
import MoveFlavorText from './MoveFlavorText';
import MoveMachines from './MoveMachines';
import MoveTarget from './MoveTarget';
import MovePokemon from './MovePokemon';
import MoveStats from './MoveStats';

export type MovePageProps = Omit<PokestatsMovePageProps, 'autocompleteList'>;

const MovePage = ({
  move,
  moveMachines,
  target,
  superContestEffect,
  contestEffect,
}: MovePageProps): JSX.Element => {
  console.log('move', move);
  console.log('moveMachines', moveMachines);
  // console.log('target', target);
  // console.log('superContestEffect', superContestEffect);
  // console.log('contestEffect', contestEffect);
  // data
  const { name, names: moveNames, type, flavor_text_entries, learned_by_pokemon } = move;
  // memo
  const pokemonList = useMemo(
    () =>
      learned_by_pokemon.map(pokemon => ({
        name: pokemon.name,
        id: getIdFromURL(pokemon.url, 'pokemon'),
      })),
    [learned_by_pokemon],
  );

  const moveName = findEnglishName(moveNames);

  return (
    <AnimatePresence mode="wait">
      <MainContainer
        flexjustify="flex-start"
        flexalign="flex-start"
        $contained
        $withGutter
        initial="hidden"
        animate="visible"
        exit="fade"
        variants={pageContainerVariant}
        key={`move-page-${name}`}
      >
        <Divider />
        <Box
          flexdirection={{ xxs: 'column-reverse', lg: 'row' }}
          flexalign="flex-start"
          flexjustify="flex-start"
          flexgap="2em"
        >
          <Box
            flexjustify={{ xxs: 'center', lg: 'flex-start' }}
            flexalign={{ xxs: 'center', lg: 'flex-start' }}
            flexgap="1.5em"
          >
            <Box
              flexalign={{ xxs: 'center', lg: 'flex-start' }}
              flexdirection={{ xxs: 'column-reverse', lg: 'column' }}
              flexgap={{ xxs: '0.5em', lg: '0.3em' }}
            >
              <TypeBadge $typename={type.name} />
              <PageHeading>{moveName}</PageHeading>
            </Box>
            <Box
              flexdirection="row"
              flexalign="flex-start"
              flexjustify="flex-start"
              flexgap="1.5em"
            >
              <Box screensizes={4} flexgap="1.5em">
                <MoveInfo move={move} />
                <MoveMachines moveName={moveName} moveType={type.name} machines={moveMachines} />
              </Box>
              <MoveFlavorText flavorTexts={flavor_text_entries} screensizes={8} />
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box
          flexjustify={{ xxs: 'center', lg: 'flex-start' }}
          flexalign={{ xxs: 'center', lg: 'flex-start' }}
          flexdirection="row"
          flexgap="1.5em"
        >
          <Box screensizes={5} flexgap="1.5em" $parentGap="1.5em">
            <MoveEntries move={move} moveName={moveName} />
            <MoveTarget target={target} />
          </Box>
          <Box screensizes={7} flexgap="1.5em" $parentGap="1.5em">
            <MoveStats move={move} moveName={moveName} />
            <MoveContest
              move={move}
              moveName={moveName}
              contestEffect={contestEffect}
              superContestEffect={superContestEffect}
            />
          </Box>
        </Box>
        <Divider />
        <MovePokemon pokemonList={pokemonList as Pokemon[]} />
        <Divider />
      </MainContainer>
    </AnimatePresence>
  );
};

export default MovePage;
