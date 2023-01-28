import { useMemo } from 'react';
import { useRouter } from 'next/router';
// types
import type { Move, MoveLearnMethod } from 'pokenode-ts';
// helpers
import { removeDash, mapGeneration, fadeInUpVariant, FilteredMove } from '@/helpers';
// styles
import { SectionMessage, UppercasedTd } from '@/components/BaseStyles';
import {
  TableContainer,
  MovesTableEl,
  TableBody,
  NameTH,
  DataCell,
  NameTD,
  TableRow,
} from './StyledMovesTable';
// components
import { AnimatePresence, HTMLMotionProps } from 'framer-motion';
import TypeBadge from '@/components/TypeBadge';
import Box from '@/components/Box';

interface TypeMovesProps extends HTMLMotionProps<'div'> {
  moves: (FilteredMove | Move)[];
  learnMethod?: MoveLearnMethod['name'];
  machineNames?: string[];
}

const MovesTable = ({ moves, learnMethod, machineNames, ...rest }: TypeMovesProps): JSX.Element => {
  // router
  const router = useRouter();
  // memo
  const mapMethodName = useMemo(() => {
    if (learnMethod) {
      switch (learnMethod) {
        case 'level-up':
          return 'Level';
        case 'machine':
          return 'Machine';
        default:
          return '-';
      }
    } else {
      return null;
    }
  }, [learnMethod]);

  const onCellClick = (moveName: Move['name'], id: Move['id']) =>
    id <= 850 && router.push(`/move/${moveName}`);

  return (
    <AnimatePresence mode="wait">
      {moves?.length !== 0 && (
        <TableContainer {...rest}>
          <MovesTableEl>
            <thead>
              <tr>
                {mapMethodName && <th>{mapMethodName}</th>}
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
              {moves.map((move, i) => {
                // prefetch move page
                router.prefetch(`/move/${move.name}`);

                return (
                  <TableRow key={`type-${move.name}-${i}`}>
                    {learnMethod && (
                      <>
                        {/** @ts-ignore */}
                        {learnMethod === 'level-up' && <td>{move?.level_learned_at}</td>}
                        {learnMethod === 'machine' &&
                        !!machineNames?.length &&
                        machineNames?.[i] ? (
                          <DataCell onClick={() => onCellClick(move.name, move.id)}>
                            <Box
                              flexdirection="row"
                              flexjustify="space-between"
                              width="75%"
                              flexmargin="0 auto"
                              flexgap="0.1em"
                            >
                              <span>{machineNames[i].toUpperCase()}</span>
                              <img
                                src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/${
                                  machineNames[i].includes('hm') ? 'hm' : 'tm'
                                }/${move.type.name}.png`}
                                alt={move.type.name}
                                width="30"
                              />
                            </Box>
                          </DataCell>
                        ) : (
                          <DataCell onClick={() => onCellClick(move.name, move.id)}>...</DataCell>
                        )}
                        {learnMethod === 'egg' && <td>-</td>}
                        {learnMethod === 'tutor' && <td>-</td>}
                      </>
                    )}
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
      )}
      {/** NO MOVES */}
      {moves.length === 0 && (
        <SectionMessage
          initial="hidden"
          animate="show"
          exit="exit"
          variants={fadeInUpVariant}
          key="type-nomoves-message"
        >
          No moves for current type.
        </SectionMessage>
      )}
    </AnimatePresence>
  );
};

export default MovesTable;
