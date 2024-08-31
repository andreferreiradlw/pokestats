import { useMemo } from 'react';
// types
import type { Type } from 'pokenode-ts';
// helpers
import { mapGeneration, removeDash } from '@/helpers';
// components
import { Stack, StackProps, Typography } from '@mui/material';
// styles
import { Table } from '@/BaseStyles';

interface TypeInfoProps extends StackProps {
  type: Type;
}

const TypeInfo = ({ type, ...rest }: TypeInfoProps): JSX.Element => {
  const { id, generation, move_damage_class } = type;
  // memo
  const generationName = useMemo(() => mapGeneration(generation.name), [generation.name]);

  return (
    <Stack flexGrow={1} {...rest}>
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
              <Typography textTransform="capitalize" component="td">
                {removeDash(move_damage_class.name)}
              </Typography>
            </tr>
          )}
        </tbody>
      </Table>
    </Stack>
  );
};

export default TypeInfo;
