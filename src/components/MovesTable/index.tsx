import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import type { Move, MoveLearnMethod } from 'pokenode-ts';
import { usePlausible } from 'next-plausible';
import { removeDash, mapGeneration, fadeInUpVariant, rowVariant, FilteredMove } from '@/helpers';
import { UppercasedTd } from '@/components/BaseStyles';
import {
  TableContainer,
  MovesTableEl,
  TableBody,
  NameTH,
  DataCell,
  NameTD,
  TableRow,
} from './StyledMovesTable';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import TypeBadge from '@/components/TypeBadge';
import Box from '@/components/Box';
import { Typography } from '@mui/material';

interface TypeMovesProps extends HTMLMotionProps<'div'> {
  moves: (FilteredMove | Move)[];
  learnMethod?: MoveLearnMethod['name'];
  machineNames?: string[];
}

const MovesTable = ({ moves, learnMethod, machineNames, ...rest }: TypeMovesProps): JSX.Element => {
  const router = useRouter();
  const plausible = usePlausible();

  const mapMethodName = useMemo(() => {
    switch (learnMethod) {
      case 'level-up':
        return 'Level';
      case 'machine':
        return 'Machine';
      default:
        return '-';
    }
  }, [learnMethod]);

  const onCellClick = useCallback(
    (moveName: Move['name'], id: Move['id']) => {
      if (id <= 850) {
        plausible('Move Table Click');
        router.push(`/move/${moveName}`);
      }
    },
    [plausible, router],
  );

  const renderMoveCell = useCallback(
    (move: FilteredMove | Move, index: number) => {
      if (!learnMethod) {
        return null;
      }

      switch (learnMethod) {
        case 'level-up':
          return (
            <DataCell onClick={() => onCellClick(move.name, move.id)}>
              {/** @ts-ignore */}
              {move?.level_learned_at || '-'}
            </DataCell>
          );
        case 'machine':
          return (
            <DataCell onClick={() => onCellClick(move.name, move.id)}>
              {!!machineNames?.length && machineNames[index] ? (
                <Box
                  flexdirection="row"
                  flexjustify="space-between"
                  width="75%"
                  flexmargin="0 auto"
                  flexgap="0.1em"
                >
                  <span>{machineNames[index].toUpperCase()}</span>
                  <img
                    src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${machineNames[index].includes('hm') ? 'hm' : 'tm'}/${move.type.name}.png`}
                    alt={move.type.name}
                    width="30"
                  />
                </Box>
              ) : (
                '-'
              )}
            </DataCell>
          );
        case 'egg':
        case 'tutor':
        default:
          return <DataCell>-</DataCell>;
      }
    },
    [learnMethod, machineNames, onCellClick],
  );

  return (
    <AnimatePresence mode="wait">
      {moves.length > 0 ? (
        <TableContainer
          initial="hidden"
          animate="show"
          exit="exit"
          variants={fadeInUpVariant}
          key="moves-table-container"
          {...rest}
        >
          <MovesTableEl>
            <thead>
              <tr>
                {learnMethod && <th>{mapMethodName}</th>}
                <NameTH>Name</NameTH>
                <th>Type</th>
                <th>Category</th>
                <th>Power</th>
                <th>PP</th>
                <th>Accuracy</th>
                <th>Priority</th>
                <th>Generation</th>
              </tr>
            </thead>
            <TableBody>
              {moves.map((move, index) => {
                router.prefetch(`/move/${move.name}`);

                return (
                  <TableRow
                    whileHover="hover"
                    whileTap="tap"
                    variants={rowVariant}
                    key={`type-${move.name}`}
                  >
                    {learnMethod && renderMoveCell(move, index)}
                    <NameTD onClick={() => onCellClick(move.name, move.id)}>
                      {removeDash(move.name)}
                    </NameTD>
                    <DataCell>
                      <TypeBadge flexmargin="0" $iconOnly $typename={move.type.name} />
                    </DataCell>
                    <UppercasedTd onClick={() => onCellClick(move.name, move.id)}>
                      {move.damage_class.name}
                    </UppercasedTd>
                    <DataCell onClick={() => onCellClick(move.name, move.id)}>
                      {move.power || '-'}
                    </DataCell>
                    <DataCell onClick={() => onCellClick(move.name, move.id)}>
                      {move.pp || '-'}
                    </DataCell>
                    <DataCell onClick={() => onCellClick(move.name, move.id)}>
                      {move.accuracy || '-'}
                    </DataCell>
                    <DataCell onClick={() => onCellClick(move.name, move.id)}>
                      {move.priority}
                    </DataCell>
                    <DataCell onClick={() => onCellClick(move.name, move.id)}>
                      {mapGeneration(move.generation.name)}
                    </DataCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </MovesTableEl>
        </TableContainer>
      ) : (
        <Typography
          variant="sectionMessage"
          component={motion.p}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={fadeInUpVariant}
          key="type-nomoves-message"
        >
          No moves for current type.
        </Typography>
      )}
    </AnimatePresence>
  );
};

export default MovesTable;
