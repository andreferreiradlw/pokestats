'use client';

import { useMemo } from 'react';
// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
// data
import { genderDifferences } from './genderDescriptions';
// helpers
import { removeDash } from '@/helpers';
import { useUmami } from '@/hooks';
// components
import { Table } from '@/BaseStyles';
import { Grid2, Stack, Typography, type Grid2Props } from '@mui/material';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';

interface PokemonFormsProps extends Grid2Props {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

const PokemonForms = ({ pokemon, species, ...rest }: PokemonFormsProps): JSX.Element => {
  // analytics
  const { track } = useUmami();

  // data
  const { forms_switchable, varieties, has_gender_differences, id } = species;
  const { name } = pokemon;

  // Memoize the gender description since it's static data
  const genderDescription = useMemo(() => genderDifferences[id], [id]);

  // Memoize the current forms
  const currForms = useMemo(() => {
    if (!varieties?.length) return 'None';

    return varieties.map(({ is_default, pokemon }) => {
      const varietyName = removeDash(pokemon.name);
      const displayName = varietyName.substring(varietyName.indexOf(' ') + 1);

      return (
        <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`} legacyBehavior passHref>
          <CustomButton
            disabled={pokemon.name === name}
            variant="outlined"
            size="small"
            fullWidth
            color="inherit"
            sx={{ justifyContent: 'center' }}
            onClick={() => track('Pokemon Page - Variety Click')}
          >{`${displayName} ${is_default ? '(Default)' : ''}`}</CustomButton>
        </Link>
      );
    });
  }, [varieties]);

  return (
    <Grid2
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={2}
      {...rest}
    >
      <Typography variant="sectionTitle">Forms</Typography>
      <Table>
        <tbody>
          <tr>
            <th>Alternative Forms</th>
            <td>{forms_switchable ? 'Yes' : 'None'}</td>
          </tr>
          <tr>
            <th>Varieties</th>
            <Stack gap={1} component="td">
              {currForms}
            </Stack>
          </tr>
          <tr>
            <th>Gender Differences</th>
            <td>{has_gender_differences ? genderDescription : 'None'}</td>
          </tr>
        </tbody>
      </Table>
    </Grid2>
  );
};

export default PokemonForms;
