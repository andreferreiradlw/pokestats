import { useSelector } from 'react-redux'
// helpers
import { capitalize } from '../../../helpers/typography'
// components
import Loading from '../../Loading'
import Box from '../../Box'
import {
  Name,
  ImageContainer,
  Image,
  Genera,
  Flavor,
  Ability,
} from './StyledInfo'
import { DescriptionList } from '../StyledPokemon'
import Training from './Training'
import Breeding from './Breeding'

export default function Info() {
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
    <Box
      as="section"
      direction={{ xxs: 'column', lg: 'row' }}
      margin="0 0 2rem"
      constrained
    >
      <Box sizes={5} align="flex-start">
        <Name>{capitalize(name)}</Name>
        Type badges go here with some border bottom
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
      <Box sizes={7}>
        <ImageContainer sizes={12}>
          <Image
            src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          />
        </ImageContainer>

        <Box direction={{ xxs: 'column', md: 'row' }}>
          <Training />
          <Breeding />
        </Box>
      </Box>
    </Box>
  )
}
