// types
import type { PokestatsMovePageProps } from '@/pages/move/[moveId]';
// helpers
import { findEnglishName } from '@/helpers';
// components
import TypeBadge from '@/components/TypeBadge';
import MoveInfo from './MoveInfo';
import MoveEntries from './MoveEntries';
import MoveContest from './MoveContest';
import MoveFlavorText from './MoveFlavorText';
import MoveMachines from './MoveMachines';
import MoveTarget from './MoveTarget';
import MovePokemon from './MovePokemon';
import MoveStats from './MoveStats';
import type { Theme } from '@mui/material';
import { Divider, Grid2, Stack, Typography } from '@mui/material';

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

  const moveName = findEnglishName(moveNames) || '';

  return (
    <Stack divider={<Divider />} gap={4}>
      <Stack
        justifyContent={{ xxs: 'center', lg: 'flex-start' }}
        alignItems={{ xxs: 'center', lg: 'flex-start' }}
        gap={4}
        width="100%"
      >
        <Stack
          alignItems={{ xxs: 'center', lg: 'flex-start' }}
          flexDirection={{ xxs: 'column-reverse', lg: 'column' }}
          gap={{ xxs: 2, lg: 1 }}
        >
          <TypeBadge $typename={type.name as keyof Theme['palette']['types']} />
          <Typography variant="pageHeading">{moveName}</Typography>
        </Stack>
        <Grid2
          container
          direction={{ xxs: 'column', lg: 'row' }}
          alignItems={{ xxs: 'center', lg: 'flex-start' }}
          justifyContent="flex-start"
          spacing={4}
          size={12}
        >
          <Grid2
            container
            size={{ xxs: 12, lg: 4 }}
            direction={{ xxs: 'column', sm: 'row', lg: 'column' }}
            spacing={2}
          >
            <MoveInfo move={move} size={{ xxs: 6, lg: 12 }} />
            <MoveMachines
              moveName={moveName}
              moveType={type.name}
              machines={moveMachines}
              size={{ xxs: 6, lg: 12 }}
            />
          </Grid2>
          <MoveFlavorText flavorTexts={flavor_text_entries} size={{ xxs: 12, lg: 8 }} />
        </Grid2>
      </Stack>
      <Grid2
        container
        justifyContent={{ xxs: 'center', lg: 'flex-start' }}
        alignItems={{ xxs: 'center', lg: 'flex-start' }}
        direction={{ xxs: 'column', lg: 'row' }}
        spacing={4}
        size={12}
      >
        <Grid2
          container
          size={{ xxs: 12, lg: 6 }}
          direction={{ xxs: 'column-reverse', lg: 'column' }}
          spacing={2}
        >
          <MoveTarget target={target} moveType={type} size={12} />
          <MoveStats move={move} moveName={moveName} size={12} />
        </Grid2>
        <Grid2 container size={{ xxs: 12, lg: 6 }} spacing={2}>
          <MoveEntries move={move} moveName={moveName} size={12} />
          <MoveContest
            move={move}
            moveName={moveName}
            contestEffect={contestEffect}
            superContestEffect={superContestEffect}
            size={12}
          />
        </Grid2>
      </Grid2>
      <MovePokemon pokemonList={learned_by_pokemon} />
    </Stack>
  );
};

export default MovePage;
