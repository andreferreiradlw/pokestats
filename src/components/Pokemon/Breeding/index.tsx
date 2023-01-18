import { useMemo } from 'react';
import styled from 'styled-components';
// helpers
import { removeDash } from '@/helpers';
// types
import type { PokemonSpecies, EvolutionChain } from 'pokenode-ts';
// styles
import { SectionTitle, Table, Numbered, UppercasedTd } from '@/components/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';
// icons
import MaleIcon from 'public/static/iconLibrary/male.svg';
import FemaleIcon from 'public/static/iconLibrary/female.svg';

const Ratio = styled.p`
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
  const { gender_rate, egg_groups, hatch_counter, habitat, growth_rate } = species;
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
          <UppercasedTd as="p">{`${egg_groups.length > 1 ? `${i + 1}. ` : ``}${removeDash(
            group.name,
          )}`}</UppercasedTd>
        </Numbered>
      )),
    [egg_groups],
  );
  const eggCycle = useMemo(
    () => (
      <>
        <p>{`${hatch_counter} cycles`}</p>
        <span>{`(${255 * (hatch_counter + 1)} steps)`}</span>
      </>
    ),
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
            <th>Growth Rate</th>
            <UppercasedTd>{removeDash(growth_rate.name)}</UppercasedTd>
          </tr>
          <tr>
            <th>Egg Groups</th>
            <UppercasedTd>{egg_groups?.length ? eggGroups : 'No Egg Groups'}</UppercasedTd>
          </tr>
          <tr>
            <th>Egg Cycles</th>
            <UppercasedTd>{hatch_counter ? eggCycle : 'No Egg Cycles'}</UppercasedTd>
          </tr>
          <tr>
            <th>Baby Trigger Item</th>
            <UppercasedTd>
              {babyTriggerItem ? removeDash(babyTriggerItem.name) : 'None'}
            </UppercasedTd>
          </tr>
          <tr>
            <th>Habitat</th>
            <UppercasedTd>{habitat ? habitat.name : 'None'}</UppercasedTd>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default Breeding;
