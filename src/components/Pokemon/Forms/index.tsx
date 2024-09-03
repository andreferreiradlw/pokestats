import { useMemo } from 'react';
// types
import type { PokemonSpecies } from 'pokenode-ts';
// data
import genderDescriptions from './genderDescriptions.json';
// components
import { Table, Numbered } from '@/components/BaseStyles';
import { Grid2, Grid2Props, Typography } from '@mui/material';
// helpers
import { removeDash } from '@/helpers';

interface PokemonFormsProps extends Grid2Props {
  pokemonId: number;
  species: PokemonSpecies;
}

const PokemonForms = ({ pokemonId, species, ...rest }: PokemonFormsProps): JSX.Element => {
  const { forms_switchable, varieties, has_gender_differences } = species;

  // Memoize the gender description since it's static data
  // @ts-expect-error: cannot update json types
  const genderDescription = useMemo(() => genderDescriptions[pokemonId], [pokemonId]);

  // Memoize the current forms
  const currForms = useMemo(() => {
    if (!varieties?.length) return 'None';

    return varieties.map((form, i) => {
      const varietyName = removeDash(form.pokemon.name);
      const displayName = varietyName.substring(varietyName.indexOf(' ') + 1);

      return (
        <Numbered key={form.pokemon.name}>
          {varieties.length > 1 ? `${i + 1}. ` : ''}
          {displayName}
          {form.is_default && <span> (Default)</span>}
        </Numbered>
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
            <Typography textTransform="capitalize" component="td">
              {currForms}
            </Typography>
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
