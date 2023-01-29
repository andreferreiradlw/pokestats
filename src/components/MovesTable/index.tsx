import { useMemo } from 'react';
import { useRouter } from 'next/router';
// types
import type { Move, MoveLearnMethod } from 'pokenode-ts';
// helpers
import { removeDash, mapGeneration, rowVariant, FilteredMove } from '@/helpers';
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
import Link from 'next/link';

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

  const onRowClick = () => {
    if (process.env.NODE_ENV === 'production' && window?.plausible)
      window.plausible('Move Table Click');
  };

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
              {moves.map((move, i) => (
                <TableRow
                  whileHover="hover"
                  whileTap="tap"
                  variants={rowVariant}
                  key={`type-${move.name}-${i}`}
                  onClick={onRowClick}
                >
                  {learnMethod && (
                    <>
                      {learnMethod === 'level-up' && (
                        <td>
                          <Link href={`/move/${move.name}`} prefetch={false}>
                            {/** @ts-ignore */}
                            {move?.level_learned_at}
                          </Link>
                        </td>
                      )}
                      {learnMethod === 'machine' &&
                        (!!machineNames?.length && machineNames?.[i] ? (
                          <DataCell>
                            <Link href={`/move/${move.name}`} prefetch={false}>
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
                            </Link>
                          </DataCell>
                        ) : (
                          <DataCell>
                            <Link href={`/move/${move.name}`} prefetch={false}>
                              ...
                            </Link>
                          </DataCell>
                        ))}
                      {learnMethod === 'egg' && (
                        <td>
                          <Link href={`/move/${move.name}`} prefetch={false}>
                            -
                          </Link>
                        </td>
                      )}
                      {learnMethod === 'tutor' && (
                        <td>
                          <Link href={`/move/${move.name}`} prefetch={false}>
                            -
                          </Link>
                        </td>
                      )}
                    </>
                  )}
                  <NameTD>
                    <Link href={`/move/${move.name}`}>{removeDash(move.name)}</Link>
                  </NameTD>
                  <DataCell>
                    <TypeBadge flexmargin="0" $iconOnly $typename={move.type.name} />
                  </DataCell>
                  <UppercasedTd>
                    <Link href={`/move/${move.name}`} prefetch={false}>
                      {move.damage_class.name}
                    </Link>
                  </UppercasedTd>
                  <DataCell>
                    <Link href={`/move/${move.name}`} prefetch={false}>
                      {move.power || '-'}
                    </Link>
                  </DataCell>
                  <DataCell>
                    <Link href={`/move/${move.name}`} prefetch={false}>
                      {move.pp || '-'}
                    </Link>
                  </DataCell>
                  <DataCell>
                    <Link href={`/move/${move.name}`} prefetch={false}>
                      {move.accuracy || '-'}
                    </Link>
                  </DataCell>
                  <DataCell>
                    <Link href={`/move/${move.name}`} prefetch={false}>
                      {move.priority}
                    </Link>
                  </DataCell>
                  <DataCell>
                    <Link href={`/move/${move.name}`} prefetch={false}>
                      {mapGeneration(move.generation.name)}
                    </Link>
                  </DataCell>
                </TableRow>
              ))}
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
