import styled from 'styled-components';
// types
import { Type } from 'pokenode-ts';
// helpers
import { mapGeneration, removeDash } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
// styles
import { Table } from '@/components/BaseStyles';

const InfoTable = styled(Table)`
  width: 100%;
`;

interface TypeInfoProps extends BoxProps {
  type: Type;
}

const TypeInfo = ({ type, ...rest }: TypeInfoProps): JSX.Element => {
  const { id, generation, move_damage_class } = type;

  return (
    <Box {...rest}>
      <InfoTable>
        <tbody>
          <tr>
            <th>Type Id</th>
            <td>{`#${id}`}</td>
          </tr>
          {generation && (
            <tr>
              <th>Generation</th>
              <td>{mapGeneration(generation.name)}</td>
            </tr>
          )}
          {move_damage_class && (
            <tr>
              <th>Move Damage Class</th>
              <td>{removeDash(move_damage_class.name)}</td>
            </tr>
          )}
        </tbody>
      </InfoTable>
    </Box>
  );
};

export default TypeInfo;
