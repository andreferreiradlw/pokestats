import { useSelector } from 'react-redux'
// components
import Loading from '../../../Loading'
import Box from '../../../Box'
//helpers
import { capitalize } from '../.././../../helpers/typography'
// styles
import { SectionTitle, Table, Numbered } from '../../StyledPokemon'

export default function Training({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector((state) => state.pokemon.info)
  // biology
  const pokemonBio = useSelector((state) => state.pokemon.biology)
  // data
  const { stats } = pokemonInfo.data
  const {} = pokemonBio.data

  // EV yield
  const EVYield = (pokemonStats) => {
    return pokemonStats.map(
      (currStat, i) =>
        currStat.effort > 0 && (
          <Numbered key={i}>{`${currStat.effort} ${capitalize(
            currStat.stat.name
          )}`}</Numbered>
        )
    )
  }

  return (
    <>
      {pokemonBio.isLoading ? (
        <Loading />
      ) : (
        <Box align="flex-start" margin="0 0 2rem" {...rest}>
          <SectionTitle>Breeding</SectionTitle>
          <Table forwardedAs="table" align="flex-start">
            <tbody>
              <tr>
                <th>EV Yield</th>
                <td>{EVYield(stats)}</td>
              </tr>
              <tr>
                <th>Catch Rate</th>
                <td>male</td>
              </tr>
              <tr>
                <th>Base Happiness</th>
                <td>male</td>
              </tr>
              <tr>
                <th>Base Experience</th>
                <td>male</td>
              </tr>
              <tr>
                <th>Growth Rate</th>
                <td>male</td>
              </tr>
            </tbody>
          </Table>
        </Box>
      )}
    </>
  )
}
