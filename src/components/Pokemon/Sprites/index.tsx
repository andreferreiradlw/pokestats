// types
import type { Pokemon, PokemonSprites } from 'pokenode-ts';
// helpers
import { removeUnderscore } from '@/helpers/typography';
// components
import Box, { BoxProps } from '@/components/Box';
// styles
import { SectionTitle, SectionSubTitle } from '@/components/BaseStyles';
import { SpriteContainer, Sprite, NoSprites } from './StyledSprites';

interface SpritesProps extends BoxProps {
  pokemonSprites: PokemonSprites;
  pokemonId: Pokemon['id'];
}

const Sprites = ({ pokemonSprites, pokemonId, ...rest }: SpritesProps): JSX.Element => {
  // sprites
  const animatedSprites = pokemonSprites.versions['generation-v']['black-white'].animated;
  const dreamWorldSprites = pokemonSprites.other.dream_world;
  const officalArtworkSprites = pokemonSprites.other['official-artwork'];

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Sprites</SectionTitle>
      {pokemonSprites ? (
        <>
          <Box
            direction="row-reverse"
            align="flex-end"
            justify={{ xxs: 'center', lg: 'flex-end' }}
            margin="0 0 2rem"
            $flexWrap="wrap"
          >
            {Object.keys(pokemonSprites).map(
              (key, i) =>
                pokemonSprites[key] &&
                typeof pokemonSprites[key] !== 'object' && (
                  <SpriteContainer sizes={1.5} key={`${key}-${i}`}>
                    <Sprite
                      alt={key}
                      key={`sprite-${key}`}
                      src={pokemonSprites[key]}
                      width="115"
                      pixelateImg
                      placeholderwidth="40%"
                    />
                    <p>{removeUnderscore(key)}</p>
                  </SpriteContainer>
                ),
            )}
          </Box>
          {pokemonId < 650 && (
            <Box align={{ xxs: 'center', lg: 'flex-start' }}>
              <SectionSubTitle>Animated Sprites</SectionSubTitle>
              <Box
                direction="row-reverse"
                align="flex-end"
                justify={{ xxs: 'center', lg: 'flex-end' }}
                margin="0 0 2rem"
                $flexWrap="wrap"
              >
                {Object.keys(animatedSprites).map(
                  (key, i) =>
                    animatedSprites[key] &&
                    typeof animatedSprites[key] !== 'object' && (
                      <SpriteContainer sizes={1.5} key={`${key}-${i}`}>
                        <Sprite
                          alt={key}
                          key={`animated-sprite-${key}`}
                          src={animatedSprites[key]}
                          width="115"
                          $animated
                          pixelateImg
                          placeholderwidth="40%"
                        />
                        <p>{removeUnderscore(key)}</p>
                      </SpriteContainer>
                    ),
                )}
              </Box>
            </Box>
          )}
          <Box direction={{ xxs: 'column', md: 'row' }} align={{ xxs: 'center', md: 'flex-start' }}>
            {(dreamWorldSprites.front_default || dreamWorldSprites.front_female) && (
              <Box align="center" margin="0 0 2rem" sizes={6}>
                <SectionSubTitle>Dreamworld Artwork</SectionSubTitle>
                <Box direction="row" justify="center" $flexWrap="wrap">
                  {Object.keys(dreamWorldSprites).map(
                    (key, i) =>
                      dreamWorldSprites[key] && (
                        <SpriteContainer key={`${key}-${i}`} sizes={6}>
                          <Sprite
                            alt={`DreamWorld Design ${removeUnderscore(key)}`}
                            key={`dreamworld-sprite-${key}`}
                            $dreamworld
                            src={dreamWorldSprites[key]}
                            height="180"
                            placeholderwidth="30%"
                          />
                          <p>{removeUnderscore(key)}</p>
                        </SpriteContainer>
                      ),
                  )}
                </Box>
              </Box>
            )}
            {officalArtworkSprites.front_default && (
              <Box align="center" sizes={6}>
                <SectionSubTitle>Official Artwork</SectionSubTitle>
                <SpriteContainer width={{ xxs: '100%', md: 'auto' }}>
                  <Sprite
                    alt="Official Artwork Front Default"
                    key="official-artwork"
                    $dreamworld
                    src={officalArtworkSprites.front_default}
                    height="180"
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
    </Box>
  );
};

export default Sprites;
