import { useSelector } from 'react-redux'
// helpers
import { capitalize } from '../../../helpers/typography'
// components
import Box from '../../Box'
import Loading from '../../Loading'
import TypeBadge from '../../TypeBadge'
// styles
import { Table, Numbered } from '../StyledPokemon'
import { Name, TypeContainer, Genera, Flavor } from './StyledDetails'

export default function Details({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // biology
  const pokemonBio = useSelector(state => state.pokemon.biology)
  // game version
  const gameVersion = useSelector(state => state.game.version)

  // data
  const { types, abilities, id, name, weight, height } = pokemonInfo.data
  const {
    genera,
    flavor_text_entries,
    shape,
    color,
    is_baby,
    is_legendary,
    is_mythical,
  } = pokemonBio.data

  // flavor text
  const flavorText = version => {
    const versionEntry = flavor_text_entries.filter(entry => {
      return entry.version.name === version
    })
    // return text
    return versionEntry.length
      ? versionEntry[0].flavor_text
      : 'No description available for currently selected generation.'
  }

  // weight
  const pokemonWeight = currWeight =>
    `${currWeight / 10} kg ( ${Math.round(currWeight * 2.2046) / 10} lbs )`

  // height
  const pokemonHeight = currHeight => {
    // calculate height in feet
    const heightInFeet = Math.round(currHeight * 3.2808) / 10
    // split number
    const numbers = heightInFeet.toString().split('.')
    // return string
    return `${currHeight / 10} m ( ${numbers[0] || '0'}'${numbers[1] || '0'}" )`
  }

  // abilities
  const pokemonAbilities = currAbilities =>
    currAbilities.map(({ ability, is_hidden }, i) => (
      <Numbered light={is_hidden} key={i}>
        {`${i + 1}. ${capitalize(ability.name)} `}
        {is_hidden && '( Hidden Ability )'}
      </Numbered>
    ))

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <Name>{capitalize(name)}</Name>
      {types.length > 0 && (
        <TypeContainer
          width="auto"
          direction="row"
          justify="flex-start"
          flexWrap="wrap"
          margin="0 0 0.5rem"
        >
          {types.map(({ type }, i) => {
            return (
              <TypeBadge type={type.name} key={i}>
                {type.name}
              </TypeBadge>
            )
          })}
        </TypeContainer>
      )}
      {pokemonBio.isLoading ? (
        <Loading />
      ) : (
        <>
          {(is_baby || is_legendary || is_mythical) && (
            <Genera>
              {is_baby && `Baby `}
              {is_legendary && `Legendary `}
              {is_mythical && `Mythical `}
              Pokemon
            </Genera>
          )}
          {gameVersion && <Flavor>{flavorText(gameVersion)}</Flavor>}
          <Table forwardedAs="table" align="flex-start">
            <tbody>
              <tr>
                <th>National №</th>
                <td>{`#${id}`}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{genera}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{pokemonWeight(weight)}</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>{pokemonHeight(height)}</td>
              </tr>
              <tr>
                <th>Abilities</th>
                <td>{pokemonAbilities(abilities)}</td>
              </tr>
              <tr>
                <th>Shape</th>
                <td>{capitalize(shape.name)}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{capitalize(color.name)}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </Box>
  )
}
