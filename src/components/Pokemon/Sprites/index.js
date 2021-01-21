import { useSelector } from 'react-redux'
import LazyLoad from 'react-lazyload'
// helpers
import { removeUnderscore } from '../../../helpers/typography'
// components
import Box from '../../Box'
import Loading from '../../Loading'
// styles
import { SectionTitle, SectionSubTitle } from '../../BaseStyles'
import { SpriteContainer, Sprite, NoSprites } from './StyledSprites'

export default function Sprites({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // data
  const { sprites, id } = pokemonInfo.data
  // artwork
  const dreamWorld = sprites.other.dream_world
  const officialArtwork = sprites.other['official-artwork'].front_default
  const animatedSprites =
    sprites.versions['generation-v']['black-white'].animated

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
                      <SpriteContainer sizes={1.5} key={`${key}-${i}`}>
                        <LazyLoad height={130} once>
                          <Sprite alt={key} src={sprites[key]} />
                        </LazyLoad>
                        <p>{removeUnderscore(key)}</p>
                      </SpriteContainer>
                    )
                )}
              </Box>
              {id < 650 && (
                <Box align={{ xxs: 'center', lg: 'flex-start' }}>
                  <SectionSubTitle>Animated Sprites</SectionSubTitle>
                  <Box
                    direction="row-reverse"
                    justify={{ xxs: 'center', lg: 'flex-end' }}
                    margin="0 0 2rem"
                    flexWrap="wrap"
                  >
                    {Object.keys(animatedSprites).map(
                      (key, i) =>
                        animatedSprites[key] &&
                        typeof animatedSprites[key] !== 'object' && (
                          <SpriteContainer sizes={1.5} key={`${key}-${i}`}>
                            <LazyLoad height={80} once>
                              <Sprite
                                alt={key}
                                animated
                                src={animatedSprites[key]}
                              />
                            </LazyLoad>
                            <p>{removeUnderscore(key)}</p>
                          </SpriteContainer>
                        )
                    )}
                  </Box>
                </Box>
              )}
              <Box
                direction={{ xxs: 'column', md: 'row' }}
                align={{ xxs: 'center', md: 'flex-start' }}
              >
                {(dreamWorld.front_default || dreamWorld.front_female) && (
                  <Box align="center" margin="0 0 2rem" sizes={6}>
                    <SectionSubTitle>Dreamworld Artwork</SectionSubTitle>
                    <Box direction="row" justify="center" flexWrap="wrap">
                      {Object.keys(dreamWorld).map(
                        (key, i) =>
                          dreamWorld[key] && (
                            <SpriteContainer key={`${key}-${i}`} sizes={6}>
                              <LazyLoad height={180} once>
                                <Sprite
                                  alt={`DreamWorld Design ${removeUnderscore(
                                    key
                                  )}`}
                                  dreamworld
                                  src={dreamWorld[key]}
                                />
                              </LazyLoad>
                              <p>{removeUnderscore(key)}</p>
                            </SpriteContainer>
                          )
                      )}
                    </Box>
                  </Box>
                )}
                {officialArtwork && (
                  <Box align="center" sizes={6}>
                    <SectionSubTitle>Official Artwork</SectionSubTitle>
                    <SpriteContainer width={{ xxs: '100%', md: 'auto' }}>
                      <LazyLoad height={180} once>
                        <Sprite
                          alt={`Official Artwork Front Default`}
                          dreamworld
                          src={officialArtwork}
                        />
                      </LazyLoad>
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
