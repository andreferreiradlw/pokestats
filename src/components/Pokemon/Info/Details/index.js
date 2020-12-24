import { useSelector } from 'react-redux'
// helpers
import { capitalize } from '../../../../helpers/typography'
// components
import Box from '../../../Box'
import Loading from '../../../Loading'
import TypeBadge from '../../../TypeBadge'
// styles
import { DescriptionList } from '../../StyledPokemon'
import { Name, TypeContainer, Genera, Flavor, Ability } from './StyledDetails'

export default function Details({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector((state) => state.pokemon.info)
  // biology
  const pokemonBio = useSelector((state) => state.pokemon.biology)
  // game version
  const gameVersion = useSelector((state) => state.game.version)

  // data
  const { types, abilities, id, name, weight, height } = pokemonInfo.data
  const {
    genera,
    flavor_text_entries,
    shape,
    is_baby,
    is_legendary,
    is_mythical,
  } = pokemonBio.data

  // flavor text
  const flavorText = (version) => {
    const versionEntry = flavor_text_entries.filter((entry) => {
      return entry.version.name === version
    })
    // return text
    return versionEntry[0].flavor_text
  }

  // decimal number
  const insertDecimal = (num) => {
    return num / 10
  }

  return (
    <Box {...rest}>
      <Name>{capitalize(name)}</Name>
      {types.length > 0 && (
        <TypeContainer direction="row" justify="flex-start" flexWrap="wrap">
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
          <DescriptionList forwardedAs="table" align="flex-start">
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
                <td>{`${insertDecimal(weight)} kg`}</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>{`${insertDecimal(height)} m`}</td>
              </tr>
              <tr>
                <th>Abilities</th>
                <td>
                  {abilities.map(({ ability, is_hidden }, i) => {
                    return (
                      <Ability isHidden={is_hidden} key={i}>
                        {`${i + 1}. ${capitalize(ability.name)} `}
                        {is_hidden && '(Hidden Ability)'}
                      </Ability>
                    )
                  })}
                </td>
              </tr>
              <tr>
                <th>Shape</th>
                <td>{capitalize(shape.name)}</td>
              </tr>
            </tbody>
          </DescriptionList>
        </>
      )}
    </Box>
  )
}
