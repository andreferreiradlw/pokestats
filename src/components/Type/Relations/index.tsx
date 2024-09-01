// types
import type { TypeRelations as PokeNodeTypeRelations } from 'pokenode-ts';
// helpers
import { removeUnderscore } from '@/helpers';
// components
import TypeBadge from '@/components/TypeBadge';
import { Table, TypesCell } from '@/components/BaseStyles';
import { Stack, StackProps, Typography, Box, useTheme, useMediaQuery, Theme } from '@mui/material';

interface TypeRelationsProps extends StackProps {
  relations: PokeNodeTypeRelations;
}

const TypeRelations = ({ relations, ...rest }: TypeRelationsProps): JSX.Element => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

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
