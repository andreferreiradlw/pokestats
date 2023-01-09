// types
import type { Pokemon, PokemonSprites } from 'pokenode-ts';
// helpers
import { removeUnderscore } from '@/helpers/typography';
// components
import Box, { BoxProps } from '@/components/Box';
// styles
import { SectionTitle, SectionSubTitle } from '@/components/BaseStyles';
import { SpriteContainer, Sprite, SpriteSubtitle, NoSprites } from './StyledSprites';

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
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="2em" {...rest}>
      <SectionTitle>Sprites</SectionTitle>
      {pokemonSprites ? (
        <>
          <Box
            flexdirection="row"
            flexalign="flex-start"
            flexjustify={{ xxs: 'center', lg: 'flex-start' }}
            flexgap="2em"
            flexwrap="wrap"
          >
            {Object.keys(pokemonSprites).map(
              (key, i) =>
                pokemonSprites[key] &&
                typeof pokemonSprites[key] !== 'object' && (
                  <SpriteContainer screensizes={1.5} key={`${key}-${i}`}>
                    <Sprite
                      alt={key}
                      key={`sprite-${key}`}
                      src={pokemonSprites[key]}
                      width="125"
                      pixelateImg
                      placeholderwidth="40%"
                    />
                    <p>{removeUnderscore(key)}</p>
                  </SpriteContainer>
                ),
            )}
          </Box>
          {pokemonId < 650 && (
            <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="2em">
              <SectionSubTitle>Animated Sprites</SectionSubTitle>
              <Box
                flexdirection="row"
                flexalign="flex-start"
                flexjustify={{ xxs: 'center', lg: 'flex-start' }}
                flexgap="2em"
                flexwrap="wrap"
              >
                {Object.keys(animatedSprites).map(
                  (key, i) =>
                    animatedSprites[key] &&
                    typeof animatedSprites[key] !== 'object' && (
                      <SpriteContainer screensizes={1.5} key={`${key}-${i}`} flexgap="1em">
                        <Sprite
                          alt={key}
                          key={`animated-sprite-${key}`}
                          src={animatedSprites[key]}
                          width="100"
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
          <Box
            flexdirection={{ xxs: 'column', md: 'row' }}
            flexalign={{ xxs: 'center', md: 'flex-start' }}
            flexjustify={{ xxs: 'center', md: 'space-around' }}
            flexgap="1em"
          >
            {(dreamWorldSprites.front_default || dreamWorldSprites.front_female) && (
              <Box flexalign="center" screensizes={4} flexgap="2em">
                <SpriteSubtitle>Dreamworld Artwork</SpriteSubtitle>
                <Box flexdirection="row" flexjustify="center" flexwrap="wrap">
                  {Object.keys(dreamWorldSprites).map(
                    (key, i) =>
                      dreamWorldSprites[key] && (
                        <SpriteContainer key={`${key}-${i}`} screensizes={6} flexgap="1em">
                          <Sprite
                            alt={`DreamWorld Design ${removeUnderscore(key)}`}
                            key={`dreamworld-sprite-${key}`}
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
              <Box flexalign="center" screensizes={4} flexgap="2em">
                <SpriteSubtitle>Official Artwork</SpriteSubtitle>
                <SpriteContainer width={{ xxs: '100%', md: 'auto' }} flexgap="1em">
                  <Sprite
                    alt="Official Artwork Front Default"
                    key="official-artwork"
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
