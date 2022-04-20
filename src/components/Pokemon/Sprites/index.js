import { useSelector } from 'react-redux'
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

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Sprites</SectionTitle>
      {pokemonInfo.isLoading && (
        <Loading height="300px" $iconWidth="5%" key={`pokemon-sprites`} />
      )}
      {!pokemonInfo.isLoading && (
        <>
          {sprites ? (
            <>
              <Box
                direction="row-reverse"
                align="flex-end"
                justify={{ xxs: 'center', lg: 'flex-end' }}
                margin="0 0 2rem"
                $flexWrap="wrap"
              >
                {Object.keys(sprites).map(
                  (key, i) =>
                    sprites[key] &&
                    typeof sprites[key] !== 'object' && (
                      <SpriteContainer sizes={1.5} key={`${key}-${i}`}>
                        <Sprite
                          alt={key}
                          key={`sprite-${key}`}
                          src={sprites[key]}
                          width={115}
                          $pixelated
                          placeholderwidth="40%"
                        />
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
                    align="flex-end"
                    justify={{ xxs: 'center', lg: 'flex-end' }}
                    margin="0 0 2rem"
                    $flexWrap="wrap"
                  >
                    {Object.keys(
                      sprites.versions['generation-v']['black-white'].animated
                    ).map(
                      (key, i) =>
                        sprites.versions['generation-v']['black-white']
                          .animated[key] &&
                        typeof sprites.versions['generation-v']['black-white']
                          .animated[key] !== 'object' && (
                          <SpriteContainer sizes={1.5} key={`${key}-${i}`}>
                            <Sprite
                              alt={key}
                              key={`animated-sprite-${key}`}
                              src={
                                sprites.versions['generation-v']['black-white']
                                  .animated[key]
                              }
                              width={115}
                              animated
                              $pixelated
                              placeholderwidth="40%"
                            />
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
                {(sprites.other.dream_world.front_default ||
                  sprites.other.dream_world.front_female) && (
                  <Box align="center" margin="0 0 2rem" sizes={6}>
                    <SectionSubTitle>Dreamworld Artwork</SectionSubTitle>
                    <Box direction="row" justify="center" $flexWrap="wrap">
                      {Object.keys(sprites.other.dream_world).map(
                        (key, i) =>
                          sprites.other.dream_world[key] && (
                            <SpriteContainer key={`${key}-${i}`} sizes={6}>
                              <Sprite
                                alt={`DreamWorld Design ${removeUnderscore(
                                  key
                                )}`}
                                key={`dreamworld-sprite-${key}`}
                                dreamworld
                                src={sprites.other.dream_world[key]}
                                height={180}
                                placeholderwidth="30%"
                              />
                              <p>{removeUnderscore(key)}</p>
                            </SpriteContainer>
                          )
                      )}
                    </Box>
                  </Box>
                )}
                {sprites.other['official-artwork'].front_default && (
                  <Box align="center" sizes={6}>
                    <SectionSubTitle>Official Artwork</SectionSubTitle>
                    <SpriteContainer width={{ xxs: '100%', md: 'auto' }}>
                      <Sprite
                        alt={`Official Artwork Front Default`}
                        key={`official-artwork`}
                        dreamworld
                        src={sprites.other['official-artwork'].front_default}
                        height={180}
                        placeholderwidth="30%"
                      />
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
