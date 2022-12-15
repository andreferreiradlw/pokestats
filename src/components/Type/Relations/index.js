import styled, { css } from 'styled-components';
// helpers
import { removeUnderscore } from '../../../helpers';
// components
import Box from '../../Box';
import TypeBadge from '../../TypeBadge';
// styles
import { Table, SectionTitle } from '../../BaseStyles';

const RelationsTable = styled(Table)`
  width: 100%;
`;

const RelationTitle = styled(SectionTitle)`
  ${({ theme }) => css`
    @media ${theme.device.md} {
      display: none;
    }
  `}
`;

export default function TypeRelations({ relations, ...rest }) {
  return (
    <Box {...rest}>
      <RelationTitle>Damage Relations</RelationTitle>
      <RelationsTable>
        <tbody>
          {Object.keys(relations).map((relation, i) => (
            <tr key={`type-relation-${i}`}>
              <th>{removeUnderscore(relation)}</th>
              <td>
                {!relations[relation].length
                  ? 'None'
                  : relations[relation].map((type, i) => (
                      <TypeBadge
                        key={`${type.name}-${relation}-${i}`}
                        typename={type.name}
                        $iconOnly
                      />
                    ))}
              </td>
            </tr>
          ))}
        </tbody>
      </RelationsTable>
    </Box>
  );
}
