import { useMemo } from 'react';
// types
import type { PokemonSpecies } from 'pokenode-ts';
// data
import genderDescriptions from './genderDescriptions.json';
// components
import Box, { BoxProps } from '@/components/Box';
// helpers
import { removeDash } from '@/helpers';
// styles
import { SectionTitle, Table, Numbered } from '@/components/BaseStyles';

interface PokemonFormsProps extends BoxProps {
  pokemonId: number;
  species: PokemonSpecies;
}

const PokemonForms = ({ pokemonId, species, ...rest }: PokemonFormsProps): JSX.Element => {
  // data
  const { forms_switchable, varieties, has_gender_differences } = species;
  // memo
  const currForms = useMemo(
    () =>
      varieties?.map((form, i) => {
        const varietyName = removeDash(form.pokemon.name);
        return (
          <Numbered key={`${form.pokemon.name}-${i}`}>
            {`${varieties.length > 1 ? `${i + 1}. ` : ``}${varietyName.substr(
              varietyName.indexOf(' ') + 1,
            )}`}
            {form.is_default && <span>{` ( default )`}</span>}
          </Numbered>
        );
      }),
    [varieties],
  );

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em" {...rest}>
      <SectionTitle>Forms</SectionTitle>
      <Table>
        <tbody>
          <tr>
            <th>Alternative Forms</th>
            <td>{forms_switchable ? 'Yes' : 'None'}</td>
          </tr>
          <tr>
            <th>Varieties</th>
            <td>{currForms}</td>
          </tr>
          <tr>
            <th>Gender Differences</th>
            <td>{has_gender_differences ? genderDescriptions[pokemonId] : 'None'}</td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default PokemonForms;
