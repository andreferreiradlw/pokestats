import React, { useMemo, useState } from 'react';
// types
import type { PokemonType } from 'pokenode-ts';
// helpers
import getMultipliers, { MultipliersRes } from './damage_multipliers';
import { removeUnderscore } from '@/helpers';
// components
import TypeBadge from '@/components/TypeBadge';
import { Table } from '@/components/BaseStyles';
import { Grid2, Grid2Props, Stack, Switch, Theme, Tooltip, Typography } from '@mui/material';
// icons
import ShieldIcon from '@mui/icons-material/Shield';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

interface MultipliersProps extends Grid2Props {
  pokemonTypes: PokemonType[];
}

interface TypesTableProps {
  multipliers: MultipliersRes['attack'] | MultipliersRes['defense'];
  multiplierType: 'attack' | 'defense';
}

const TypesTable = React.memo(
  ({ multipliers, multiplierType }: TypesTableProps): JSX.Element => (
    <Table>
      <tbody>
        {Object.entries(multipliers).map(([relation, types]) => (
          <tr key={`${multiplierType}-${relation}`}>
            <Typography textTransform="capitalize" component="th">
              {removeUnderscore(relation)}
            </Typography>
            <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap" component="td">
              {types.length === 0 ? (
                <Typography variant="body2">None</Typography>
              ) : (
                types.map(type => (
                  <TypeBadge
                    key={`${multiplierType}-${relation}-${type}`}
                    $typename={type as keyof Theme['palette']['types']}
                    $iconOnly
                  />
                ))
              )}
            </Stack>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
);

const Multipliers = ({ pokemonTypes, ...rest }: MultipliersProps): JSX.Element => {
  const [isAttackMode, setIsAttackMode] = useState(true);

  const currTypes = useMemo(() => pokemonTypes.map(currType => currType.type.name), [pokemonTypes]);

  const { attack: attackMultipliers, defense: defenseMultipliers } = useMemo(
    () => getMultipliers(currTypes),
    [currTypes],
  );

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAttackMode(event.target.checked);
  };

  return (
    <Grid2 flexDirection="column" gap={2} {...rest}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="sectionTitle">Relations</Typography>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Tooltip title="Defending" placement="top">
            <ShieldIcon />
          </Tooltip>
          <Switch
            checked={isAttackMode}
            onChange={handleSwitchChange}
            inputProps={{ 'aria-label': 'Toggle attack/defense mode' }}
          />
          <Tooltip title="Attacking" placement="top">
            <ConnectWithoutContactIcon />
          </Tooltip>
        </Stack>
      </Stack>
      <TypesTable
        multipliers={isAttackMode ? attackMultipliers : defenseMultipliers}
        multiplierType={isAttackMode ? 'attack' : 'defense'}
      />
    </Grid2>
  );
};

export default Multipliers;
