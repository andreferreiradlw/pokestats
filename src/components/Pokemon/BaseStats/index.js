import { useSelector } from 'react-redux'
// helpers
import { capitalize } from '../../../helpers/typography'
// components
import Box from '../../Box'
// styles
import { SectionTitle, Table } from '../StyledPokemon'

export default function BaseStats({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector((state) => state.pokemon.info)
  // data
  const { stats } = pokemonInfo.data

  return (
    <Box align="flex-start" margin="0 0 2rem" {...rest}>
      <SectionTitle>Base Stats</SectionTitle>
      <Table forwardedAs="table" align="flex-start">
        <tbody>
          {stats.map(({ base_stat, effort, stat }, i) => (
            <tr key={i}>
              <th>{capitalize(stat.name)}</th>
              <td>{base_stat}</td>
              <td>Progress Bar</td>
              <td>Min</td>
              <td>Max</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}
