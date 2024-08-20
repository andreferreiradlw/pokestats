// types
import { NamedAPIResource } from 'pokenode-ts';
// components
import TypeBadge from '@/components/TypeBadge';
import { Grid, GridProps, Typography } from '@mui/material';

interface TypeListProps extends GridProps {
  types: NamedAPIResource[];
}

const TypeList = ({ types, ...rest }: TypeListProps): JSX.Element => {
  if (!types) return null;

  return (
    <Grid container direction="column" {...rest}>
      <Typography variant="sectionTitle">Types</Typography>
      <Grid
        container
        item
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={2}
        flexWrap="wrap"
      >
        {types?.map(({ name }) => (
          <Grid item key={`homepage-typebadge-${name}`}>
            <TypeBadge $typename={name} key={`homepage-typebadge-${name}`} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default TypeList;
