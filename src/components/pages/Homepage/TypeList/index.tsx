// types
import type { NamedAPIResource } from 'pokenode-ts';
// components
import TypeBadge from '@/components/TypeBadge';
import { Grid2, Typography, type Grid2Props, type Theme } from '@mui/material';

interface TypeListProps extends Grid2Props {
  types: NamedAPIResource[];
}

const TypeList = ({ types, ...rest }: TypeListProps): JSX.Element => (
  <Grid2 container direction="column" gap={4} {...rest}>
    <Grid2>
      <Typography variant="sectionTitle">Types</Typography>
    </Grid2>
    <Grid2 container alignItems="center" justifyContent="center" gap={2} wrap="wrap">
      {types?.map(({ name }) => (
        <Grid2 key={`homepage-typebadge-${name}`}>
          <TypeBadge
            $typename={name as keyof Theme['palette']['types']}
            key={`homepage-typebadge-${name}`}
          />
        </Grid2>
      ))}
    </Grid2>
  </Grid2>
);

export default TypeList;
