import { useMemo } from 'react';
// helpers
import { capitalise, removeDash } from '@/helpers';
import { styled } from '@mui/material/styles';
import { usePlausible } from 'next-plausible';
// types
import type { PokemonSpecies, EvolutionChain } from 'pokenode-ts';
// styles
import { Table } from '@/components/BaseStyles';
// components
import type { Grid2Props } from '@mui/material';
import { capitalize, Grid2, Stack, Typography } from '@mui/material';
// icons
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';

const Ratio = styled(Typography)`
  white-space: nowrap;

  svg {
    margin-left: 0.2em;
    width: 1em;
  }
`;

interface BreedingProps extends Grid2Props {
  species: PokemonSpecies;
  babyTriggerItem: EvolutionChain['baby_trigger_item'];
}

const Breeding = ({ species, babyTriggerItem, ...rest }: BreedingProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  // data
  const { gender_rate, egg_groups, hatch_counter, habitat, growth_rate } = species;

  // Gender ratio calculation
  const genderRatio = useMemo(() => {
    if (gender_rate === -1) return 'Genderless';
    return (
      <Ratio>
        {`${12.5 * (8 - gender_rate)}%`} <MaleIcon /> , {`${12.5 * gender_rate}%`} <FemaleIcon />
      </Ratio>
    );
  }, [gender_rate]);

  // Egg groups list
  const eggGroups = useMemo(() => {
    if (!egg_groups || egg_groups.length === 0) return 'No Egg Groups';

    return (
      <Stack gap={1}>
        {egg_groups.map(({ name }) => (
          <Link key={name} href={`/egg-group/${name}`} legacyBehavior passHref>
            <CustomButton
              variant="outlined"
              size="small"
              fullWidth
              color="inherit"
              sx={{ justifyContent: 'center' }}
              onClick={() => plausible('Pokemon Egg Group Click')}
            >
              {capitalise(name)}
            </CustomButton>
          </Link>
        ))}
      </Stack>
    );
  }, [egg_groups]);

  // Egg cycle calculation
  const eggCycle = useMemo(() => {
    if (!hatch_counter) return 'No Egg Cycles';
    const steps = 255 * (hatch_counter + 1);
    return (
      <>
        <Typography>{`${hatch_counter} cycles`}</Typography>
        <Typography
          variant="body2"
          component="span"
        >{`(${steps.toLocaleString()} steps)`}</Typography>
      </>
    );
  }, [hatch_counter]);

  return (
    <Grid2
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={2}
      flexDirection="column"
      {...rest}
    >
      <Typography variant="sectionTitle">Breeding</Typography>
      <Table>
        <tbody>
          <tr>
            <th>Gender Distribution</th>
            <td>{genderRatio}</td>
          </tr>
          <tr>
            <th>Growth Rate</th>
            <td>{capitalize(removeDash(growth_rate.name))}</td>
          </tr>
          <tr>
            <th>Egg Cycles</th>
            <td>{eggCycle}</td>
          </tr>
          <tr>
            <th>Baby Trigger Item</th>
            <td>{babyTriggerItem ? capitalize(removeDash(babyTriggerItem.name)) : 'None'}</td>
          </tr>
          <tr>
            <th>Habitat</th>
            <td>{habitat ? capitalize(removeDash(habitat.name)) : 'None'}</td>
          </tr>
          <tr>
            <th>Egg Groups</th>
            <td>{eggGroups}</td>
          </tr>
        </tbody>
      </Table>
    </Grid2>
  );
};

export default Breeding;
