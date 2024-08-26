// types
import type { PokestatsMovePageProps } from '@/pages/move/[moveId]';
// helpers
import { findEnglishName } from '@/helpers';
// styles
import { PageHeading } from '@/BaseStyles';
// components
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
import { Divider, Stack } from '@mui/material';

export type MovePageProps = Omit<PokestatsMovePageProps, 'autocompleteList'>;

const MovePage = ({
  move,
  moveMachines,
  target,
  superContestEffect,
  contestEffect,
}: MovePageProps): JSX.Element => {
  // data
  const { names: moveNames, type, flavor_text_entries, learned_by_pokemon } = move;

  const moveName = findEnglishName(moveNames);

  return (
    <Stack divider={<Divider />} gap={4} py={2}>
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
            flexdirection={{ xxs: 'column', lg: 'row' }}
            flexalign={{ xxs: 'center', lg: 'flex-start' }}
            flexjustify="flex-start"
            flexgap="1.5em"
          >
            <Box
              screensizes={4}
              flexdirection={{ xxs: 'column', sm: 'row', lg: 'column' }}
              flexgap="1.5em"
            >
              <MoveInfo move={move} />
              <MoveMachines moveName={moveName} moveType={type.name} machines={moveMachines} />
            </Box>
            <MoveFlavorText flavorTexts={flavor_text_entries} screensizes={8} />
          </Box>
        </Box>
      </Box>
      <Box
        flexjustify={{ xxs: 'center', lg: 'flex-start' }}
        flexalign={{ xxs: 'center', lg: 'flex-start' }}
        flexdirection={{ xxs: 'column', lg: 'row' }}
        flexgap="3em"
      >
        <Box
          screensizes={6}
          flexdirection={{ xxs: 'column-reverse', lg: 'column' }}
          flexgap="1.5em"
        >
          <MoveTarget target={target} moveType={type} />
          <MoveStats move={move} moveName={moveName} />
        </Box>
        <Box screensizes={6} flexgap="1.5em">
          <MoveEntries move={move} moveName={moveName} />
          <MoveContest
            move={move}
            moveName={moveName}
            contestEffect={contestEffect}
            superContestEffect={superContestEffect}
          />
        </Box>
      </Box>
      <MovePokemon pokemonList={learned_by_pokemon} />
    </Stack>
  );
};

export default MovePage;
