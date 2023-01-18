import { useState, useEffect } from 'react';
// types
import type { PokemonType } from 'pokenode-ts';
// helpers
import getMultipliers, { MultipliersRes } from './damage_multipliers';
import { removeUnderscore } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
import TypeBadge from '@/components/TypeBadge';
import Switch from './Switch';
// styles
import { SectionTitle, Table, TypesCell, UppercasedTd } from '@/components/BaseStyles';

interface MultipliersProps extends BoxProps {
  pokemonTypes: PokemonType[];
}

interface TypesTableProps {
  multipliers: MultipliersRes['attack'] | MultipliersRes['defense'];
  multiplierType: 'attack' | 'defense';
}

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
  // switch state
  const [enabled, setEnabled] = useState(true);
  // multipliers
  const [attackMultipliers, setAttackMultipliers] = useState<MultipliersRes['attack']>();
  const [defenseMultipliers, setDefenseMultipliers] = useState<MultipliersRes['defense']>();

  useEffect(() => {
    let currTypes = pokemonTypes.map(currType => {
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
        <SectionTitle>Multipliers</SectionTitle>
        <Switch enabled={enabled} onClick={() => setEnabled(prev => !prev)} />
      </Box>
      {defenseMultipliers && attackMultipliers && (
        <TypesTable
          multipliers={enabled ? defenseMultipliers : attackMultipliers}
          multiplierType={enabled ? 'defense' : 'attack'}
        />
      )}
    </Box>
  );
};

export default Multipliers;
