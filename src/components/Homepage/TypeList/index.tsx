// types
import { NamedAPIResource } from 'pokenode-ts';
// components
import TypeBadge from '@/components/TypeBadge';
import { Grid2, Grid2Props, Theme, Typography } from '@mui/material';

interface TypeListProps extends Grid2Props {
  types: NamedAPIResource[];
}

const TypeList = ({ types, ...rest }: TypeListProps): JSX.Element | null => {
  if (!types) return null;

  return (
    <Grid2 container direction="column" {...rest}>
      <Typography variant="sectionTitle">Types</Typography>
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
};

export default TypeList;
