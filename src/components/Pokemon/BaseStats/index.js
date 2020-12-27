import { useSelector } from 'react-redux'
// helpers
import { capitalize } from '../../../helpers/typography'
// components
import Box from '../../Box'
import ProgressBar from './ProgressBar'
// styles
import { SectionTitle } from '../StyledPokemon'
import { StatsTable, BarCell } from './StyledBaseStats'

export default function BaseStats({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector((state) => state.pokemon.info)
  // data
  const { stats } = pokemonInfo.data

  // total stats
  const totalStats = (values) =>
    values.map((stat) => stat.base_stat).reduce((a, b) => a + b, 0)

  // progress
  const progressCalc = (statValue) => {
    const percentage = (100 / 180) * statValue
    return percentage > 100 ? 100 : percentage
  }

  // min stats

  // max stats

  return (
    <Box align="flex-start" margin="0 0 2rem" {...rest}>
      <SectionTitle>Base Stats</SectionTitle>
      <StatsTable forwardedAs="table" align="flex-start">
        <tbody>
          {stats.map(({ base_stat, effort, stat }, i) => (
            <tr key={i}>
              <th>{capitalize(stat.name)}</th>
              <td>{base_stat}</td>
              <BarCell>
                <ProgressBar progress={progressCalc(base_stat)} />
              </BarCell>
              <td>Min</td>
              <td>Max</td>
            </tr>
          ))}
          <tr>
            <th>Total</th>
            <td>{totalStats(stats)}</td>
            <td></td>
            <td>Min</td>
            <td>Max</td>
          </tr>
        </tbody>
      </StatsTable>
    </Box>
  )
}
