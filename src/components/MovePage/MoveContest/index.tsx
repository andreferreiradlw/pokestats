// types
import type { ContestEffect, Move, SuperContestEffect } from 'pokenode-ts';
// helpers
import { removeDash } from '@/helpers';
// components
import Contest from './Contest';
import { capitalize, Grid2, Grid2Props, Typography } from '@mui/material';

interface MoveContestProps extends Grid2Props {
  move: Move;
  moveName: string;
  superContestEffect: SuperContestEffect;
  contestEffect: ContestEffect;
}

const MoveContest = ({
  move,
  moveName,
  contestEffect,
  superContestEffect,
  ...rest
}: MoveContestProps): JSX.Element => {
  // @ts-expect-error: invalid types
  const { contest_type, contest_combos } = move;
  const { normal: normalCombos, super: superCombos } = contest_combos || {};

  return (
    <Grid2
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={2}
      {...rest}
    >
      <Typography variant="sectionTitle">Contests</Typography>
      {contest_type ? (
        <>
          <Typography>
            <Typography fontWeight="600" component="span">
              {moveName}
            </Typography>
            {` has the `}
            <Typography fontWeight="600" component="span">
              {capitalize(removeDash(contest_type.name))}
            </Typography>
            {` contest type.`}
          </Typography>
          {contestEffect && (
            <Contest
              combos={normalCombos}
              contestType={contest_type}
              effect={contestEffect}
              moveName={moveName}
            />
          )}
          {superContestEffect && (
            <Contest
              title="Super Contests"
              combos={superCombos}
              contestType={contest_type}
              effect={superContestEffect}
              moveName={moveName}
            />
          )}
        </>
      ) : (
        <Typography>{`${moveName} has no contest types.`}</Typography>
      )}
    </Grid2>
  );
};

export default MoveContest;
