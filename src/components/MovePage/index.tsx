// types
import type { PokestatsMovePageProps } from '@/pages/move/[moveId]';
// helpers
import { findEnglishName, pageContainerVariant } from '@/helpers';
// styles
import { PageHeading } from '@/BaseStyles';
// components
import { AnimatePresence } from 'framer-motion';
import { MainContainer } from '@/components/Layout';
import Box from '@/components/Box';
import TypeBadge from '@/components/TypeBadge';

export type TypePageProps = Omit<PokestatsMovePageProps, 'autocompleteList'>;

const MovePage = ({ move, superContestEffect, target }: TypePageProps): JSX.Element => {
  // console.log(move, target, superContestEffect);

  // data
  const { name, names: moveNames, type } = move;

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
        <Box
          flexdirection={{ xxs: 'column-reverse', lg: 'row' }}
          flexalign="flex-start"
          flexjustify="flex-start"
          flexgap="2em"
        >
          <Box
            flexjustify={{ xxs: 'center', lg: 'flex-start' }}
            flexalign={{ xxs: 'center', lg: 'flex-start' }}
            flexgap="2em"
          >
            <Box
              flexalign={{ xxs: 'center', lg: 'flex-start' }}
              flexdirection={{ xxs: 'column-reverse', lg: 'column' }}
              flexgap={{ xxs: '0.5em', lg: '0.3em' }}
            >
              <TypeBadge $typename={type.name} />
              <PageHeading>{moveName}</PageHeading>
            </Box>
          </Box>
        </Box>
      </MainContainer>
    </AnimatePresence>
  );
};

export default MovePage;
