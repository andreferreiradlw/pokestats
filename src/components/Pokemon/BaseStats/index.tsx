import { useMemo } from 'react';
// types
import type { PokemonStat, Stat } from 'pokenode-ts';
// helpers
import { removeDash } from '@/helpers';
// components
import type { Grid2Props } from '@mui/material';
import { Grid2, Typography } from '@mui/material';
import ProgressBar from './ProgressBar';
import { Table } from '@/BaseStyles';

// Helper to calculate the total stats
const calculateTotalStats = (stats: PokemonStat[]): number =>
  stats.reduce((total, { base_stat }) => total + base_stat, 0);

// Helper to calculate the progress percentage
const calculateProgress = (statValue: PokemonStat['base_stat']): number =>
  Math.min((100 / 180) * statValue, 100);

// Helper to calculate minimum or maximum stats
const calculateStat = (
  type: 'min' | 'max',
  baseStat: PokemonStat['base_stat'],
  statName: Stat['name'],
): number => {
  const isHP = statName === 'hp';
  const EV = type === 'min' ? 0 : 252;
  const IV = type === 'min' ? 0 : 31;
  const level = 100;
  const natureModifier = type === 'min' ? 0.9 : 1.1;

  return isHP
    ? Math.floor(((2 * baseStat + IV + EV / 4) * level) / 100 + level + 10)
    : Math.floor(Math.floor(((2 * baseStat + IV + EV / 4) * level) / 100 + 5) * natureModifier);
};

interface BaseStatsProps extends Grid2Props {
  stats: PokemonStat[];
}

const BaseStats = ({ stats, ...rest }: BaseStatsProps): JSX.Element => {
  // Memoizing calculated total stats for optimization
  const totalStats = useMemo(() => calculateTotalStats(stats), [stats]);

  return (
    <Grid2
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      gap={2}
      {...rest}
    >
      <Typography variant="sectionTitle">Base Stats</Typography>
      <Table>
        <tbody>
          {stats.map(({ base_stat, stat }) => {
            const statName = stat.name as Stat['name'];

            return (
              <tr key={statName}>
                <Typography textTransform="capitalize" component="th">
                  {removeDash(statName)}
                </Typography>
                <td>{base_stat}</td>
                <ProgressBar progress={calculateProgress(base_stat)} />
                <td>{calculateStat('min', base_stat, statName)}</td>
                <td>{calculateStat('max', base_stat, statName)}</td>
              </tr>
            );
          })}
          <tr>
            <th>Total</th>
            <td>{totalStats}</td>
            <td />
            <td>Min</td>
            <td>Max</td>
          </tr>
        </tbody>
      </Table>
    </Grid2>
  );
};

export default BaseStats;
