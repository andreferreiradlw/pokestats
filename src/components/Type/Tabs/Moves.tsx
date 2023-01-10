// types
import type { Move } from 'pokenode-ts';
// helpers
import { removeDash, mapGeneration, fadeInUpVariant } from '@/helpers';
// styles
import { SectionMessage } from '@/components/BaseStyles';
import {
  TableContainer,
  MovesTable,
  NameTH,
  NameTD,
  TableRow,
  TableBody,
} from '@/components/Pokemon/Moves/StyledMoves';
// components
import { AnimatePresence } from 'framer-motion';
import TypeBadge from '@/components/TypeBadge';

interface TypeMovesProps {
  moves: Move[];
}

const TypeMoves = ({ moves }: TypeMovesProps): JSX.Element => {
  return (
    <AnimatePresence mode="wait">
      {moves.length !== 0 && (
        <TableContainer>
          <MovesTable>
            <thead>
              <tr>
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
                <TableRow key={`type-${move.name}-${i}`}>
                  <NameTD>{removeDash(move.name)}</NameTD>
                  <td>
                    <TypeBadge flexmargin="0" $iconOnly $typename={move.type.name} />
                  </td>
                  <td>{move.damage_class ? removeDash(move.damage_class.name) : '-'}</td>
                  <td>{move.power || '-'}</td>
                  <td>{move.pp || '-'}</td>
                  <td>{move.accuracy || '-'}</td>
                  <td>{move.priority}</td>
                  <td>{mapGeneration(move.generation.name) || '-'}</td>
                </TableRow>
              ))}
            </TableBody>
          </MovesTable>
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

export default TypeMoves;
