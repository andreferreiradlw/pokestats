import styled, { css } from 'styled-components';
// types
import type { TypeRelations as PokeNodeTypeRelations } from 'pokenode-ts';
// helpers
import { removeUnderscore } from '@/helpers';
// components
import { Stack, StackProps } from '@mui/material';
import TypeBadge from '@/components/TypeBadge';
// styles
import { Table, SectionTitle, TypesCell, UppercasedTd } from '@/components/BaseStyles';

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

interface TypeRelationsProps extends StackProps {
  relations: PokeNodeTypeRelations;
}

const TypeRelations = ({ relations, ...rest }: TypeRelationsProps): JSX.Element => (
  <Stack flexGrow={1} {...rest}>
    <RelationTitle>Damage Relations</RelationTitle>
    <RelationsTable>
      <tbody>
        {Object.keys(relations).map((relation, i) => (
          <tr key={`type-relation-${i}`}>
            <UppercasedTd as="th">{removeUnderscore(relation)}</UppercasedTd>
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
  </Stack>
);

export default TypeRelations;
