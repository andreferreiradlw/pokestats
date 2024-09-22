// types
import type { TypeRelations as PokeNodeTypeRelations } from 'pokenode-ts';
// helpers
import { removeUnderscore } from '@/helpers';
import { useBreakpoint } from '@/hooks';
// components
import TypeBadge from '@/components/TypeBadge';
import { Table, TypesCell } from '@/components/BaseStyles';
import type { StackProps, Theme } from '@mui/material';
import { Stack, Typography, Box } from '@mui/material';

interface TypeRelationsProps extends StackProps {
  relations: PokeNodeTypeRelations;
}

const TypeRelations = ({ relations, ...rest }: TypeRelationsProps): JSX.Element => {
  // breakpoint
  const isMediumUp = useBreakpoint({ breakpoint: 'md' });

  return (
    <Stack flexGrow={1} {...rest}>
      {!isMediumUp && (
        <Typography variant="sectionTitle" gutterBottom>
          Damage Relations
        </Typography>
      )}
      <Box component={Table} width="100%">
        <tbody>
          {Object.keys(relations).map(relation => (
            <tr key={`type-relation-${relation}`}>
              <Typography textTransform="capitalize" component="th">
                {removeUnderscore(relation)}
              </Typography>
              <TypesCell>
                {!relations[relation as keyof PokeNodeTypeRelations].length
                  ? 'None'
                  : relations[relation as keyof PokeNodeTypeRelations].map(type => (
                      <TypeBadge
                        key={`${type.name}-${relation}}`}
                        $typename={type.name as keyof Theme['palette']['types']}
                        $iconOnly
                      />
                    ))}
              </TypesCell>
            </tr>
          ))}
        </tbody>
      </Box>
    </Stack>
  );
};

export default TypeRelations;
