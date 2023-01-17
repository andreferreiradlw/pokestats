import { useMemo } from 'react';
import styled from 'styled-components';
// types
import type { PokestatsTypePageProps } from '@/pages/type/[typeId]';
// helpers
import { mapGeneration, removeDash } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
// styles
import { Table, UppercasedTd } from '@/components/BaseStyles';

const InfoTable = styled(Table)`
  width: 100%;
`;

interface TypeInfoProps extends BoxProps {
  type: PokestatsTypePageProps['typeInfo'];
}

const TypeInfo = ({ type, ...rest }: TypeInfoProps): JSX.Element => {
  const { id, generation, move_damage_class } = type;
  // memo
  const generationName = useMemo(() => mapGeneration(generation.name), [generation.name]);

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
      </InfoTable>
    </Box>
  );
};

export default TypeInfo;
