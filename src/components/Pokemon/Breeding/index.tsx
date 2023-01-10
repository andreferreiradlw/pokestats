import { useMemo } from 'react';
import styled from 'styled-components';
// types
import type { PokemonSpecies, EvolutionChain } from 'pokenode-ts';
// helpers
import { removeDash } from '@/helpers/typography';
// styles
import { SectionTitle, Table, Numbered } from '@/components/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';
// icons
import MaleIcon from 'public/static/iconLibrary/male.svg';
import FemaleIcon from 'public/static/iconLibrary/female.svg';

const Ratio = styled.span`
  svg {
    margin-left: 0.2em;
    width: 1em;
  }
`;

interface BreedingProps extends BoxProps {
  species: PokemonSpecies;
  babyTriggerItem: EvolutionChain['baby_trigger_item'];
}

const Breeding = ({ species, babyTriggerItem, ...rest }: BreedingProps): JSX.Element => {
  // data
  const { gender_rate, egg_groups, hatch_counter, habitat } = species;
  // memo
  const genderRatio = useMemo(
    () => (
      <Ratio>
        {`${12.5 * (8 - gender_rate)}%`}
        <MaleIcon />
        {`, ${12.5 * gender_rate}%`}
        <FemaleIcon />
      </Ratio>
    ),
    [gender_rate],
  );
  const eggGroups = useMemo(
    () =>
      egg_groups?.map((group, i) => (
        <Numbered key={`${group.name}-${i}`}>
          {`${egg_groups.length > 1 ? `${i + 1}. ` : ``}${removeDash(group.name)}`}
        </Numbered>
      )),
    [egg_groups],
  );
  const eggCycle = useMemo(
    () => `${hatch_counter} cycles ( ${255 * (hatch_counter + 1)} steps )`,
    [hatch_counter],
  );

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em" {...rest}>
      <SectionTitle>Breeding</SectionTitle>
      <Table>
        <tbody>
          <tr>
            <th>Gender Distribution</th>
            <td>{gender_rate === -1 ? 'Genderless' : genderRatio}</td>
          </tr>
          <tr>
            <th>Egg Groups</th>
            <td>{egg_groups?.length ? eggGroups : 'No Egg Groups'}</td>
          </tr>
          <tr>
            <th>Egg Cycles</th>
            <td>{hatch_counter ? eggCycle : 'No Egg Cycles'}</td>
          </tr>
          <tr>
            <th>Baby Trigger Item</th>
            <td>{babyTriggerItem ? removeDash(babyTriggerItem.name) : 'None'}</td>
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
