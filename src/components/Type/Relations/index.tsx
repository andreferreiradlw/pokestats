import styled, { css } from 'styled-components';
// types
import type { TypeRelations as PokeNodeTypeRelations } from 'pokenode-ts';
// helpers
import { removeUnderscore } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
import TypeBadge from '@/components/TypeBadge';
// styles
import { Table, SectionTitle, TypesCell } from '@/components/BaseStyles';

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

interface TypeRelationsProps extends BoxProps {
  relations: PokeNodeTypeRelations;
}

const TypeRelations = ({ relations, ...rest }: TypeRelationsProps): JSX.Element => (
  <Box {...rest}>
    <RelationTitle>Damage Relations</RelationTitle>
    <RelationsTable>
      <tbody>
        {Object.keys(relations).map((relation, i) => (
          <tr key={`type-relation-${i}`}>
            <th>{removeUnderscore(relation)}</th>
            <TypesCell>
              {!relations[relation].length
                ? 'None'
                : relations[relation].map((type, i) => (
                    <TypeBadge
                      key={`${type.name}-${relation}-${i}`}
                      $typename={type.name}
                      $iconOnly
                    />
                  ))}
            </TypesCell>
          </tr>
        ))}
      </tbody>
    </RelationsTable>
  </Box>
);

export default TypeRelations;
