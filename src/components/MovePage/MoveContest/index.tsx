// types
import type { ContestEffect, Move, SuperContestEffect } from 'pokenode-ts';
// helpers
import { capitalise, removeDash } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
import Contest from './Contest';
import { BoldSpan, SectionTitle } from '@/BaseStyles';

interface MoveContestProps extends BoxProps {
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
  // @ts-ignore
  const { contest_type, contest_combos } = move;
  const { normal: normalCombos, super: superCombos } = contest_combos || {};

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1em" {...rest}>
      <SectionTitle>Contests</SectionTitle>
      {contest_type ? (
        <>
          <p>
            <BoldSpan>{moveName}</BoldSpan>
            {` has the `}
            <BoldSpan>{capitalise(removeDash(contest_type.name))}</BoldSpan>
            {` contest type.`}
          </p>
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
        <p>{`${moveName} has no contest types.`}</p>
      )}
    </Box>
  );
};

export default MoveContest;
