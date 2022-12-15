// types
import type { PokemonSpecies, EvolutionChain } from 'pokenode-ts';
// components
import Box, { BoxProps } from '@/components/Box';
// helpers
import { removeDash } from '@/helpers/typography';
// styles
import { SectionTitle, Table, Numbered } from '@/components/BaseStyles';

// gender ratio
const genderRatio = (rate: PokemonSpecies['gender_rate']): string =>
  `${12.5 * (8 - rate)}% male, ${12.5 * rate}% female`;

// egg groups
const eggGroups = (groups: PokemonSpecies['egg_groups']): JSX.Element[] =>
  groups.map((group, i) => (
    <Numbered key={`${group.name}-${i}`}>
      {`${groups.length > 1 ? `${i + 1}. ` : ``}${removeDash(group.name)}`}
    </Numbered>
  ));

// egg hatch cycle
const eggCycle = (counter: PokemonSpecies['hatch_counter']): string =>
  `${counter} cycles ( ${255 * (counter + 1)} steps )`;

interface BreedingProps extends BoxProps {
  species: PokemonSpecies;
  evolutionChain: EvolutionChain;
}

const Breeding = ({ species, evolutionChain, ...rest }: BreedingProps): JSX.Element => {
  // data
  const { gender_rate, egg_groups, hatch_counter, habitat } = species;
  const { baby_trigger_item } = evolutionChain;

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Breeding</SectionTitle>
      <Table>
        <tbody>
          <tr>
            <th>Gender Distribution</th>
            <td>{gender_rate === -1 ? 'Genderless' : genderRatio(gender_rate)}</td>
          </tr>
          <tr>
            <th>Egg Groups</th>
            <td>{egg_groups.length ? eggGroups(egg_groups) : 'No Egg Groups'}</td>
          </tr>
          <tr>
            <th>Egg Cycles</th>
            <td>{hatch_counter ? eggCycle(hatch_counter) : 'No Egg Cycles'}</td>
          </tr>
          <tr>
            <th>Baby Trigger Item</th>
            <td>{baby_trigger_item ? removeDash(baby_trigger_item.name) : 'None'}</td>
          </tr>
          <tr>
            <th>Habitat</th>
            <td>{habitat ? removeDash(habitat.name) : 'None'}</td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default Breeding;
