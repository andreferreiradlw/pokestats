import { useMemo } from 'react';
// types
import type { Type } from 'pokenode-ts';
// helpers
import { mapGeneration, removeDash } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
// styles
import { Table, UppercasedTd } from '@/BaseStyles';

interface TypeInfoProps extends BoxProps {
  type: Type;
}

const TypeInfo = ({ type, ...rest }: TypeInfoProps): JSX.Element => {
  const { id, generation, move_damage_class } = type;
  // memo
  const generationName = useMemo(() => mapGeneration(generation.name), [generation.name]);

  return (
    <Box {...rest}>
      <Table>
        <tbody>
          <tr>
            <th>Type Id</th>
            <td>{`#${id}`}</td>
          </tr>
          {generation && (
            <tr>
              <th>Generation</th>
              <td>{generationName}</td>
            </tr>
          )}
          {move_damage_class && (
            <tr>
              <th>Move Damage Class</th>
              <UppercasedTd>{removeDash(move_damage_class.name)}</UppercasedTd>
            </tr>
          )}
        </tbody>
      </Table>
    </Box>
  );
};

export default TypeInfo;
