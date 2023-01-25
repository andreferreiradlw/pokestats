import { useMemo } from 'react';
// types
import type { Move } from 'pokenode-ts';
// helpers
import { mapGeneration, removeDash } from '@/helpers';
// styles
import { Table, UppercasedTd } from '@/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';

interface MoveInfoProps extends BoxProps {
  move: Move;
}

const MoveInfo = ({ move, ...rest }: MoveInfoProps): JSX.Element => {
  // data
  const { damage_class, accuracy, power, pp, priority, generation } = move;
  // memo
  const generationName = useMemo(() => mapGeneration(generation.name), [generation.name]);

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1em" {...rest}>
      <Table>
        <tbody>
          <tr>
            <th>Category</th>
            <UppercasedTd>{removeDash(damage_class.name)}</UppercasedTd>
          </tr>
          <tr>
            <th>Power</th>
            <td>{power ? power : '-'}</td>
          </tr>
          <tr>
            <th>Accuracy</th>
            <td>{accuracy ? `${accuracy}%` : '-'}</td>
          </tr>
          <tr>
            <th>PP</th>
            <td>{`${pp} (max ${(pp * 8) / 5})`}</td>
          </tr>
          <tr>
            <th>Priority</th>
            <td>{priority}</td>
          </tr>
          <tr>
            <th>Introduced</th>
            <td>{generationName}</td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default MoveInfo;
