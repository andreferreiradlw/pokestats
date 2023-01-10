import { useMemo } from 'react';
// types
import type { Pokemon, PokemonSpecies, PokemonSprites } from 'pokenode-ts';
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
  forms: PokemonSpecies['varieties'];
}

const Sprites = ({ pokemonSprites, pokemonId, forms, ...rest }: SpritesProps): JSX.Element => {
  // sprites
  const animatedSprites = pokemonSprites.versions['generation-v']['black-white'].animated;
  const dreamWorldSprites = pokemonSprites.other.dream_world;
  const officalArtworkSprites = pokemonSprites.other['official-artwork'];

  const alternativeForms = useMemo(
    () =>
      forms
        .filter(form => !form.is_default)
        ?.map(form => {
          const uppercased = form.pokemon.name.replace(/\-[a-z]/g, match => match.toUpperCase());
          let arr = uppercased.split('-');
          arr.shift();

          return {
            name: arr.join('-'),
          };
        }),
    [forms],
  );

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="2em" {...rest}>
      <SectionTitle>Sprites</SectionTitle>
      {pokemonSprites ? (
        <>
          <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em">
            <SectionSubTitle>Static Sprites</SectionSubTitle>
            <Box
              flexdirection="row-reverse"
              flexalign="flex-start"
              flexjustify={{ xxs: 'center', lg: 'flex-end' }}
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
                        width="140"
                        pixelateImg
                        placeholderwidth="40%"
                      />
                      <p>{removeUnderscore(key)}</p>
                    </SpriteContainer>
                  ),
              )}
            </Box>
          </Box>
          {pokemonId < 650 && (
            <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em">
              <SectionSubTitle>Animated Sprites</SectionSubTitle>
              <Box
                flexdirection="row-reverse"
                flexalign="flex-start"
                flexjustify={{ xxs: 'center', lg: 'flex-end' }}
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
                          height="100"
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
          <SectionTitle>Varieties</SectionTitle>
          <Box
            flexdirection={{ xxs: 'column', sm: 'row' }}
            flexalign={{ xxs: 'center', md: 'stretch' }}
            flexjustify={{ xxs: 'center', md: 'space-around' }}
            flexgap="3em"
            flexwrap="wrap"
          >
            {officalArtworkSprites.front_default && (
              <Box flexalign="center" flexjustify="space-between" screensizes={3} flexgap="1em">
                <SpriteSubtitle>Official</SpriteSubtitle>
                <SpriteContainer width={{ xxs: '100%', md: 'auto' }}>
                  <Sprite
                    alt="Official Artwork Front Default"
                    key="official-artwork"
                    src={officalArtworkSprites.front_default}
                    height="180"
                    placeholderwidth="30%"
                  />
                </SpriteContainer>
              </Box>
            )}
            {(dreamWorldSprites.front_default || dreamWorldSprites.front_female) && (
              <Box flexalign="center" flexjustify="space-between" screensizes={3} flexgap="1em">
                <SpriteSubtitle>Dream World</SpriteSubtitle>
                <Box flexdirection="row" flexjustify="center" flexwrap="wrap">
                  {Object.keys(dreamWorldSprites).map(
                    (key, i) =>
                      dreamWorldSprites[key] && (
                        <SpriteContainer key={`${key}-${i}`}>
                          <Sprite
                            alt={`DreamWorld Design ${removeUnderscore(key)}`}
                            key={`dreamworld-sprite-${key}`}
                            src={dreamWorldSprites[key]}
                            height="170"
                            placeholderwidth="30%"
                          />
                        </SpriteContainer>
                      ),
                  )}
                </Box>
              </Box>
            )}
            {!!alternativeForms?.length &&
              alternativeForms.map(({ name }) => (
                <Box
                  flexalign="center"
                  flexjustify="space-between"
                  screensizes={3}
                  flexgap="1em"
                  key={`pokemon-variety-${name}`}
                  width="auto"
                >
                  <SpriteSubtitle>{name.replace(/-/g, ' ')}</SpriteSubtitle>
                  <SpriteContainer width={{ xxs: '100%', md: 'auto' }}>
                    <Sprite
                      alt="Official Artwork Front Default"
                      key="official-artwork"
                      src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokemonId
                        .toString()
                        .padStart(3, '0')}-${name}.png`}
                      height="180"
                      placeholderwidth="30%"
                    />
                  </SpriteContainer>
                </Box>
              ))}
          </Box>
        </>
      ) : (
        <NoSprites>No sprites available for this Pokémon.</NoSprites>
      )}
    </Box>
  );
};

export default Sprites;
