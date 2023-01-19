// types
import type { PokemonStat, Stat } from 'pokenode-ts';
// helpers
import { removeDash } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
import ProgressBar from './ProgressBar';
// styles
import { SectionTitle, UppercasedTd } from '@/components/BaseStyles';
import { StatsTable } from './StyledBaseStats';

// total stats
const totalStats = (values: PokemonStat[]) =>
  values.map(stat => stat.base_stat).reduce((a, b) => a + b, 0);

// progress
const progressCalc = (statValue: PokemonStat['base_stat']) => {
  const percentage = (100 / 180) * statValue;
  return percentage > 100 ? 100 : percentage;
};

// calculate stats
const statsCalc = (
  statType: 'min' | 'max',
  baseStat: PokemonStat['base_stat'],
  statName: Stat['name'],
) => {
  const EV = statType === 'min' ? 0 : 252;
  const IV = statType === 'min' ? 0 : 31;
  const level = 100;
  const nature = statType === 'min' ? 0.9 : 1.1;

  // https://bulbapedia.bulbagarden.net/wiki/Statistic
  if (statName === 'hp') {
    return Math.floor(((2 * baseStat + IV + EV / 4) * level) / 100 + level + 10);
  } else {
    return Math.floor(Math.floor(((2 * baseStat + IV + EV / 4) * level) / 100 + 5) * nature);
  }
};

interface BaseStatsProps extends BoxProps {
  stats: PokemonStat[];
}

const BaseStats = ({ stats, ...rest }: BaseStatsProps): JSX.Element => (
  <Box
    flexalign={{ xxs: 'center', lg: 'flex-start' }}
    flexjustify="flex-start"
    flexgap="1em"
    flexalignself="flex-start"
    {...rest}
  >
    <SectionTitle>Base Stats</SectionTitle>
    <StatsTable>
      <tbody>
        {stats.map(({ base_stat, stat }, i) => (
          <tr key={`${stat.name}-${i}`}>
            <UppercasedTd as="th">{removeDash(stat.name)}</UppercasedTd>
            <td>{base_stat}</td>
            <ProgressBar progress={progressCalc(base_stat)} />
            <td>{statsCalc('min', base_stat, stat.name as Stat['name'])}</td>
            <td>{statsCalc('max', base_stat, stat.name as Stat['name'])}</td>
          </tr>
        ))}
        <tr>
          <th>Total</th>
          <td>{totalStats(stats)}</td>
          <td />
          <td>Min</td>
          <td>Max</td>
        </tr>
      </tbody>
    </StatsTable>
  </Box>
);

export default BaseStats;
