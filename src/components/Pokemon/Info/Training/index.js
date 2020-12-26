import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
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
  // game version
  const gameVersion = useSelector((state) => state.game.version)
  // data
  const { stats, base_experience, held_items } = pokemonInfo.data
  const { capture_rate, base_happiness, growth_rate } = pokemonBio.data

  // held items
  const [items, setItems] = useState([])

  useEffect(() => {
    if (held_items.length && gameVersion) {
      // filter items with current version
      const versionItems = held_items
        .map(({ item, version_details }) => {
          const filteredVersions = version_details.filter(
            ({ version }) => version.name === gameVersion
          )
          // organize item info
          if (filteredVersions.length > 0) {
            return {
              item_details: item,
              version_details: filteredVersions[0],
            }
          }
        })
        .filter((currItem) => currItem)

      // set items state
      setItems(versionItems)
    }
  }, [gameVersion])

  // held items
  const heldItems = (items) => {
    return items.map(({ item, version_details }, itemIndex) => {
      return version_details.map(({ rarity, version }, i) => {
        // console.log(version.name, gameVersion, version.name === gameVersion)
        if (version.name === gameVersion) {
          return <Numbered key={itemIndex}>{capitalize(item.name)}</Numbered>
        }
      })
    })
  }

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
    } else if (happiness === 70) {
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
              <tr>
                <th>Held Items</th>
                <td>
                  {!items.length
                    ? 'None'
                    : items.map((item, i) => (
                        <Numbered key={i}>
                          {`${capitalize(item.item_details.name)} ( ${
                            item.version_details.rarity
                          }% chance )`}
                        </Numbered>
                      ))}
                </td>
              </tr>
            </tbody>
          </Table>
        </Box>
      )}
    </>
  )
}
