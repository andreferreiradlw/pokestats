import { useSelector } from 'react-redux'
// helpers
import { humanize } from '../../../helpers/typography'
// components
import Box from '../../Box'
import Loading from '../../Loading'
// styles
import { SectionTitle, SectionSubTitle } from '../StyledPokemon'
import { SpriteContainer, Sprite, NoSprites } from './StyledSprites'

export default function Sprites({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // data
  const { sprites } = pokemonInfo.data
  // artwork
  const dreamWorld = sprites.other.dream_world
  const officialArtwork = sprites.other['official-artwork'].front_default

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Sprites</SectionTitle>
      {pokemonInfo.isLoading ? (
        <Loading />
      ) : (
        <>
          {dreamWorld.front_default ||
          dreamWorld.front_female ||
          sprites.length ||
          officialArtwork ? (
            <>
              <Box
                direction="row-reverse"
                justify={{ xxs: 'center', lg: 'flex-end' }}
                margin="0 0 2rem"
                flexWrap="wrap"
              >
                {Object.keys(sprites).map(
                  (key, i) =>
                    sprites[key] &&
                    typeof sprites[key] !== 'object' && (
                      <SpriteContainer sizes={1.5} key={i}>
                        <Sprite src={sprites[key]} />
                        <p>{humanize(key)}</p>
                      </SpriteContainer>
                    )
                )}
              </Box>
              <Box
                direction={{ xxs: 'column', md: 'row' }}
                justify={{ xxs: 'center', md: 'flex-start' }}
                align="flex-start"
              >
                {(dreamWorld.front_default || dreamWorld.front_female) && (
                  <Box align={{ xxs: 'center', md: 'flex-start' }} sizes={6}>
                    <SectionSubTitle>Dreamworld Artwork</SectionSubTitle>
                    <Box
                      direction="row"
                      justify={{ xxs: 'center', md: 'flex-start' }}
                      margin="0 0 2rem"
                      flexWrap="wrap"
                    >
                      {Object.keys(dreamWorld).map(
                        (key, i) =>
                          dreamWorld[key] && (
                            <SpriteContainer key={i} sizes={6}>
                              <Sprite dreamworld src={dreamWorld[key]} />
                              <p>{humanize(key)}</p>
                            </SpriteContainer>
                          )
                      )}
                    </Box>
                  </Box>
                )}
                {officialArtwork && (
                  <Box align={{ xxs: 'center', md: 'flex-start' }} sizes={6}>
                    <SectionSubTitle>Official Artwork</SectionSubTitle>
                    <SpriteContainer width={{ xxs: '100%', md: 'auto' }}>
                      <Sprite dreamworld src={officialArtwork} />
                      <p>Front Default</p>
                    </SpriteContainer>
                  </Box>
                )}
              </Box>
            </>
          ) : (
            <NoSprites>No sprites available for this Pokémon.</NoSprites>
          )}
        </>
      )}
    </Box>
  )
}
