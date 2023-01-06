import { useState, useEffect, useMemo } from 'react';
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
import { SectionTitle, Table, TypesCell } from '@/components/BaseStyles';

interface MultipliersProps extends BoxProps {
  pokemonTypes: PokemonType[];
}

const Multipliers = ({ pokemonTypes, ...rest }: MultipliersProps): JSX.Element => {
  // data
  // const { types } = pokemon;

  const typeMultipliers = useMemo(() => {
    let currTypes = pokemonTypes.map(currType => {
      return currType.type.name;
    });
    // return multipliers
    return getMultipliers(currTypes);
  }, [pokemonTypes]);

  // current multipliers to show
  const [currMultipliers, setCurrMultipliers] = useState<
    MultipliersRes['defense'] | MultipliersRes['attack']
  >(typeMultipliers.defense);
  // switch state
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (typeMultipliers) {
      enabled
        ? setCurrMultipliers(typeMultipliers.defense)
        : setCurrMultipliers(typeMultipliers.attack);
    }
  }, [typeMultipliers, enabled]);

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} $gap="1em" {...rest}>
      <Box
        direction={{ xxs: 'column', lg: 'row' }}
        justify="space-between"
        $flexWrap="wrap"
        $gap="0.5em"
      >
        <SectionTitle>Multipliers</SectionTitle>
        <Switch enabled={enabled} onClick={() => setEnabled(prev => !prev)} />
      </Box>
      <Table>
        <tbody>
          {Object.keys(currMultipliers).map((relation, i) => (
            <tr key={`type-relation-${i}`}>
              <th>{removeUnderscore(relation)}</th>
              <TypesCell>
                {!currMultipliers[relation].length
                  ? 'None'
                  : currMultipliers[relation].map((type: string, i: number) => (
                      <TypeBadge key={`${type}-${relation}-${i}`} typename={type} $iconOnly />
                    ))}
              </TypesCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default Multipliers;
