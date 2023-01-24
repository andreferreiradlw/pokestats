// types
import type { PokestatsMovePageProps } from '@/pages/move/[moveId]';
// helpers
import { findEnglishName, pageContainerVariant } from '@/helpers';
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

export type TypePageProps = Omit<PokestatsMovePageProps, 'autocompleteList'>;

const MovePage = ({
  move,
  target,
  superContestEffect,
  contestEffect,
}: TypePageProps): JSX.Element => {
  // console.log('move', move);
  // console.log('target', target);
  // console.log('superContestEffect', superContestEffect);
  // console.log('contestEffect', contestEffect);
  // data
  const { name, names: moveNames, type, flavor_text_entries } = move;

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
              <MoveInfo move={move} screensizes={4} />
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
          <MoveEntries move={move} moveName={moveName} screensizes={5} />
          <MoveContest
            move={move}
            moveName={moveName}
            contestEffect={contestEffect}
            superContestEffect={superContestEffect}
            screensizes={7}
          />
        </Box>
        <Divider />
        <Divider />
      </MainContainer>
    </AnimatePresence>
  );
};

export default MovePage;
