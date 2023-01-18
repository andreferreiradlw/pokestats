import { useState, useEffect } from 'react';
// types
import type { PokemonType } from 'pokenode-ts';
// helpers
import getMultipliers, { MultipliersRes } from './damage_multipliers';
import { removeUnderscore } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
import TypeBadge from '@/components/TypeBadge';
import Dropdown from '@/components/Dropdown';
// styles
import { SectionTitle, Table, TypesCell, UppercasedTd } from '@/components/BaseStyles';

interface MultipliersProps extends BoxProps {
  pokemonTypes: PokemonType[];
}

interface TypesTableProps {
  multipliers: MultipliersRes['attack'] | MultipliersRes['defense'];
  multiplierType: 'attack' | 'defense';
}

const dropdownOptions = [
  { label: 'Defense', value: 'defense' },
  { label: 'Attack', value: 'attack' },
];

const TypesTable = ({ multipliers, multiplierType }: TypesTableProps): JSX.Element => (
  <Table>
    <tbody>
      {Object.keys(multipliers).map((relation, i) => (
        <tr key={`multiplier-${multiplierType}-${i}`}>
          <UppercasedTd as="th">{removeUnderscore(relation)}</UppercasedTd>
          <TypesCell>
            {!multipliers[relation]?.length
              ? 'None'
              : multipliers[relation].map((type: string, i: number) => (
                  <TypeBadge
                    key={`${multiplierType}-${type}-${relation}-${i}`}
                    $typename={type}
                    $iconOnly
                  />
                ))}
          </TypesCell>
        </tr>
      ))}
    </tbody>
  </Table>
);

const Multipliers = ({ pokemonTypes, ...rest }: MultipliersProps): JSX.Element => {
  // multipliers
  const [attackMultipliers, setAttackMultipliers] = useState<MultipliersRes['attack']>();
  const [defenseMultipliers, setDefenseMultipliers] = useState<MultipliersRes['defense']>();
  // select
  const [optionSelected, setOptionSelected] =
    useState<TypesTableProps['multiplierType']>('defense');

  useEffect(() => {
    const currTypes = pokemonTypes.map(currType => {
      return currType.type.name;
    });
    const currMultipliers = getMultipliers(currTypes);
    // updates states
    setAttackMultipliers(currMultipliers.attack);
    setDefenseMultipliers(currMultipliers.defense);
  }, []);

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em" {...rest}>
      <Box
        flexdirection={{ xxs: 'column', lg: 'row' }}
        flexjustify="space-between"
        flexwrap="wrap"
        flexgap="0.5em"
      >
        <SectionTitle>Relations</SectionTitle>
        <Dropdown
          options={dropdownOptions}
          onChange={e => setOptionSelected(e.target.value as TypesTableProps['multiplierType'])}
          value={optionSelected}
          minWidth="125px"
        />
      </Box>
      {defenseMultipliers && attackMultipliers && (
        <TypesTable
          multipliers={optionSelected === 'defense' ? defenseMultipliers : attackMultipliers}
          multiplierType={optionSelected}
        />
      )}
    </Box>
  );
};

export default Multipliers;
