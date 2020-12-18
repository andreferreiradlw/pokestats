import { useSelector } from 'react-redux'
// helpers
import { capitalize } from '../../../helpers/typography'
// components
import Loading from '../../Loading'
import {
  Name,
  ImageContainer,
  Image,
  Genera,
  Flavor,
  DescriptionList,
} from './StyledInfo'
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
    <Box as="section" noGutter margin="2rem 0">
      <Box
        direction={{ xxs: 'column', lg: 'row' }}
        align={{ xxs: 'center', lg: 'stretch' }}
        noGutter
      >
        <ImageContainer sizes={{ xxs: 12, lg: 6 }} justify="flex-end" noGutter>
          <Image
            src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          />
        </ImageContainer>
        <Box sizes={{ xxs: 12, lg: 6 }} noGutter>
          <Box grow={0}>
            <Name>{capitalize(name)}</Name>
          </Box>
          {pokemonBio.isLoading ? (
            <Loading />
          ) : (
            <Box justify="flex-start" align="flex-start">
              <Genera>{genera}</Genera>
              <Flavor>{gameVersion && flavorText(gameVersion)}</Flavor>
              <DescriptionList
                forwardedAs="dl"
                direction="row"
                align="flex-start"
                flexWrap="wrap"
                grow={0}
                noGutter
              >
                <dt>National ID</dt>
                <dd>{`#${id}`}</dd>
                <dt>Category</dt>
                <dd>{genera}</dd>
                <dt>Weight</dt>
                <dd>{`${insertDecimal(weight)} kg`}</dd>
                <dt>Height</dt>
                <dd>{`${insertDecimal(height)} m`}</dd>
                <dt>Abilities</dt>
                <dd>
                  {abilities.map(({ ability }, i) => {
                    return <span key={i}>{capitalize(ability.name)}</span>
                  })}
                </dd>
                <dt>Types</dt>
                <dd>
                  {types.map(({ type }, i) => {
                    return <span key={i}>{capitalize(type.name)}</span>
                  })}
                </dd>
              </DescriptionList>
            </Box>
          )}
        </Box>
      </Box>
      <Box>Base Stats</Box>
    </Box>
  )
}
