import { useMemo } from 'react';
// types
import type { Pokemon, PokemonSpecies, PokemonSprites } from 'pokenode-ts';
// helpers
import { removeUnderscore, prefixId, capitalise, removeDash } from '@/helpers';
// styles
import { SectionTitle, Divider } from '@/components/BaseStyles';
import { SpriteContainer, Sprite, NoSprites } from './StyledSprites';
// components
import Box, { BoxProps } from '@/components/Box';

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

  const defaultVarietyName = useMemo(() => {
    const defaultForm = removeDash(forms.find(form => form.is_default).pokemon.name);
    return capitalise(defaultForm.substring(defaultForm.indexOf(' ') + 1));
  }, [forms]);

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

  console.log(pokemonSprites);

  return (
    <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1.5em" {...rest}>
      <SectionTitle>Sprites</SectionTitle>
      {pokemonSprites ? (
        <>
          <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em">
            <Box
              flexdirection="row-reverse"
              flexalign="flex-start"
              flexjustify={{ xxs: 'center', lg: 'space-evenly' }}
              flexgap="2em"
              flexwrap="wrap"
            >
              {Object.keys(pokemonSprites).map(
                (key, i) =>
                  pokemonSprites[key] &&
                  typeof pokemonSprites[key] !== 'object' && (
                    <SpriteContainer screensizes={1.5} key={`${key}-${i}`}>
                      <Sprite
                        unoptimized
                        alt={key}
                        key={`sprite-${key}`}
                        src={pokemonSprites[key]}
                        width="140"
                        pixelatedimg
                      />
                      <Box>
                        <p>Static</p>
                        <p>{removeUnderscore(key)}</p>
                      </Box>
                    </SpriteContainer>
                  ),
              )}
            </Box>
          </Box>
          {pokemonId < 650 && (
            <Box flexalign={{ xxs: 'center', lg: 'flex-start' }} flexgap="1em">
              <Box
                flexdirection="row-reverse"
                flexalign="flex-start"
                flexjustify={{ xxs: 'center', lg: 'space-evenly' }}
                flexgap="2em"
                flexwrap="wrap"
              >
                {Object.keys(animatedSprites).map(
                  (key, i) =>
                    animatedSprites[key] &&
                    typeof animatedSprites[key] !== 'object' && (
                      <SpriteContainer screensizes={1.5} key={`${key}-${i}`} flexgap="1em">
                        <Sprite
                          unoptimized
                          alt={key}
                          key={`animated-sprite-${key}`}
                          src={animatedSprites[key]}
                          height="100"
                          pixelatedimg
                        />

                        <Box>
                          <p>Animated</p>
                          <p>{removeUnderscore(key)}</p>
                        </Box>
                      </SpriteContainer>
                    ),
                )}
              </Box>
            </Box>
          )}
          <Divider />
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
                <SpriteContainer width={{ xxs: '100%', md: 'auto' }}>
                  <Sprite
                    alt="Official Artwork Front Default"
                    key="official-artwork"
                    src={officalArtworkSprites.front_default}
                    height="180"
                  />
                </SpriteContainer>
                <p>{defaultVarietyName}</p>
              </Box>
            )}
            {(dreamWorldSprites.front_default || dreamWorldSprites.front_female) && (
              <Box flexalign="center" flexjustify="space-between" screensizes={3} flexgap="1em">
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
                          />
                        </SpriteContainer>
                      ),
                  )}
                </Box>
                <p>Dream World</p>
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
                  <SpriteContainer width={{ xxs: '100%', md: 'auto' }}>
                    <Sprite
                      alt="Official Artwork Front Default"
                      key="official-artwork"
                      src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${prefixId(
                        pokemonId,
                      )}-${name}.png`}
                      height="180"
                    />
                  </SpriteContainer>
                  <p>{name.replace(/-/g, ' ')}</p>
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
