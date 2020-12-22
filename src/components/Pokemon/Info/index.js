import { useSelector } from 'react-redux'
// helpers
import { capitalize } from '../../../helpers/typography'
// components
import Loading from '../../Loading'
import { Name, ImageContainer, Image, Genera, Flavor } from './StyledInfo'
import { DescriptionList } from '../StyledPokemon'
import Box from '../../Box'

export default function Info() {
  // pokemon info
  const pokemonInfo = useSelector((state) => state.pokemon.info)
  // biology
  const pokemonBio = useSelector((state) => state.pokemon.biology)
  // game version
  const gameVersion = useSelector((state) => state.game.version)

  // data
  const { types, abilities, id, name, weight, height } = pokemonInfo.data
  const { genera, flavor_text_entries } = pokemonBio.data

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
    <Box as="section" direction={{ xxs: 'column', lg: 'row' }} margin="2rem 0">
      <Box sizes={5} align="flex-start">
        <Name>{capitalize(name)}</Name>
        Type Badges
        {pokemonBio.isLoading ? (
          <Loading />
        ) : (
          <>
            <Genera>{genera}</Genera>
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
                    {abilities.map(({ ability }, i) => {
                      return <span key={i}>{capitalize(ability.name)}</span>
                    })}
                  </td>
                </tr>
              </tbody>
            </DescriptionList>
          </>
        )}
      </Box>
      <Box sizes={7} debug>
        {/** Image */}
        <ImageContainer sizes={12}>
          <Image
            src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          />
        </ImageContainer>
        {/** Training */}
        {/** Breeding */}
      </Box>
    </Box>
  )
}
