// types
import type { PokemonSpecies, PokemonSpeciesVariety } from 'pokenode-ts';
// components
import Box, { BoxProps } from '@/components/Box';
// helpers
import { removeDash } from '@/helpers';
// styles
import { SectionTitle, Table, Numbered } from '@/components/BaseStyles';

// forms
const currForms = (forms: PokemonSpeciesVariety[]): JSX.Element[] =>
  forms.map((form, i) => (
    <Numbered key={`${form.pokemon.name}-${i}`}>
      {`${forms.length > 1 ? `${i + 1}. ` : ``}${removeDash(form.pokemon.name)}`}
      {form.is_default && <span>{` ( default )`}</span>}
    </Numbered>
  ));

interface PokemonFormsProps extends BoxProps {
  species: PokemonSpecies;
}

const PokemonForms = ({ species, ...rest }: PokemonFormsProps): JSX.Element => {
  // data
  const { forms_switchable, varieties, has_gender_differences } = species;

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Forms</SectionTitle>
      <Table>
        <tbody>
          <tr>
            <th>Alternative Forms</th>
            <td>{forms_switchable ? 'Yes' : 'None'}</td>
          </tr>
          <tr>
            <th>Varieties</th>
            <td>{currForms(varieties)}</td>
          </tr>
          <tr>
            <th>Gender Differences</th>
            <td>{has_gender_differences ? 'Yes' : 'None'}</td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default PokemonForms;