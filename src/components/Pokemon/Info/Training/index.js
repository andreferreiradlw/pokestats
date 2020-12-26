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
  const { stats, base_experience } = pokemonInfo.data
  const { capture_rate, base_happiness, growth_rate } = pokemonBio.data

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

  // catch rate
  const catchRate = (rate) => {
    const rateChance = Math.round((33.33 / 255) * rate)
    // return string
    return (
      <>
        {rate}
        <Numbered light>{`( ${rateChance}% with pokeball, full HP )`}</Numbered>
      </>
    )
  }

  // base happiness
  const baseHappiness = (happiness) => {
    let happinessRate

    if (happiness <= 69) {
      happinessRate = 'Lower than normal'
    } else if ((happiness = 70)) {
      happinessRate = 'Normal'
    } else if (happiness >= 71 && happiness <= 139) {
      happinessRate = 'Higher than normal'
    } else if (happiness >= 140) {
      happinessRate = 'Very high'
    }

    return `${happiness} ( ${happinessRate} )`
  }

  return (
    <>
      {pokemonBio.isLoading ? (
        <Loading />
      ) : (
        <Box align="flex-start" margin="0 0 2rem" {...rest}>
          <SectionTitle>Training</SectionTitle>
          <Table forwardedAs="table" align="flex-start">
            <tbody>
              <tr>
                <th>EV Yield</th>
                <td>{EVYield(stats)}</td>
              </tr>
              <tr>
                <th>Catch Rate</th>
                <td>{catchRate(capture_rate)}</td>
              </tr>
              <tr>
                <th>Base Happiness</th>
                <td>{baseHappiness(base_happiness)}</td>
              </tr>
              <tr>
                <th>Base Exp.</th>
                <td>{base_experience}</td>
              </tr>
              <tr>
                <th>Growth Rate</th>
                <td>{capitalize(growth_rate.name)}</td>
              </tr>
            </tbody>
          </Table>
        </Box>
      )}
    </>
  )
}
