import { useMemo } from 'react';
// types
import type { OtherPokemonSprites, Pokemon, PokemonSpecies, PokemonSprites } from 'pokenode-ts';
// helpers
import { removeUnderscore, prefixId, capitalise, removeDash } from '@/helpers';
// styles
import { SpriteContainer, Sprite } from './StyledSprites';
// components
import { Divider, Grid2, Stack, StackProps, Typography } from '@mui/material';
import { ImageNextProps } from '@/components/ImageNext';

interface SpritesProps extends StackProps {
  pokemonSprites: PokemonSprites;
  pokemonId: Pokemon['id'];
  forms: PokemonSpecies['varieties'];
}

interface SpriteWithLabelProps {
  src: ImageNextProps['src'];
  alt: ImageNextProps['alt'];
  label: string;
  height?: ImageNextProps['height'];
}

// Define a type for Dream World sprites
interface DreamWorldSprites {
  front_default?: string;
  front_female?: string;
}

// Define a type for Official Artwork sprites
interface OfficialArtworkSprites {
  front_default?: string;
  front_shiny?: string;
}

type ExtendedOtherPokemonSprites = OtherPokemonSprites & {
  dream_world: DreamWorldSprites;
  'official-artwork': OfficialArtworkSprites;
};

// Extend PokemonSprites to use the extended version of `other`
interface ExtendedPokemonSprites extends Omit<PokemonSprites, 'other'> {
  other: ExtendedOtherPokemonSprites;
}

// Reusable component for rendering sprite with a label
const SpriteWithLabel = ({ src, alt, label, height = 100 }: SpriteWithLabelProps): JSX.Element => (
  <SpriteContainer>
    <Sprite unoptimized alt={alt} src={src} height={height} pixelatedimg />
    <Stack>
      <Typography>{label}</Typography>
      <Typography>{removeUnderscore(alt)}</Typography>
    </Stack>
  </SpriteContainer>
);

const Sprites = ({ pokemonSprites, pokemonId, forms, ...rest }: SpritesProps): JSX.Element => {
  // Cast pokemonSprites to the extended type to access custom properties
  const { animated } = pokemonSprites.versions['generation-v']['black-white'];
  const { dream_world: dreamWorldSprites, 'official-artwork': officialArtworkSprites } = (
    pokemonSprites as ExtendedPokemonSprites
  ).other;

  const defaultVarietyName = useMemo(() => {
    const defaultForm = removeDash(forms.find(form => form.is_default)?.pokemon.name);

    return capitalise(defaultForm.substring(defaultForm.indexOf(' ') + 1));
  }, [forms]);

  const alternativeForms = useMemo(
    () =>
      forms
        .filter(form => !form.is_default)
        .map(form => ({
          name: form.pokemon.name
            .replace(/\-[a-z]/g, match => match.toUpperCase())
            .split('-')
            .slice(1)
            .join('-')
            .replace(/-/g, ' '),
        })),
    [forms],
  );

  return (
    <Stack alignItems={{ xxs: 'center', lg: 'flex-start' }} gap={4} width="100%" {...rest}>
      <Typography variant="sectionTitle">Sprites</Typography>
      {pokemonSprites ? (
        <>
          {/* Static Sprites */}
          <Stack alignItems={{ xxs: 'center', lg: 'flex-start' }} gap={2} width="100%">
            <Stack
              flexDirection="row-reverse"
              alignItems="flex-start"
              justifyContent={{ xxs: 'center', lg: 'space-evenly' }}
              gap={4}
              flexWrap="wrap"
              width="100%"
            >
              {Object.entries(pokemonSprites).map(
                ([key, value]) =>
                  value &&
                  typeof value !== 'object' && (
                    <SpriteWithLabel key={`sprite-${key}`} src={value} alt={key} label="Static" />
                  ),
              )}
            </Stack>
          </Stack>

          {/* Animated Sprites */}
          {pokemonId < 650 && (
            <Stack alignItems={{ xxs: 'center', lg: 'flex-start' }} gap={2} width="100%">
              <Stack
                flexDirection="row-reverse"
                alignItems="flex-start"
                justifyContent={{ xxs: 'center', lg: 'space-evenly' }}
                gap={4}
                flexWrap="wrap"
                width="100%"
              >
                {Object.entries(animated).map(
                  ([key, value]) =>
                    value &&
                    typeof value !== 'object' && (
                      <SpriteWithLabel
                        key={`animated-sprite-${key}`}
                        src={value}
                        alt={key}
                        label="Animated"
                      />
                    ),
                )}
              </Stack>
            </Stack>
          )}

          <Divider />
          <Typography variant="sectionTitle">Varieties</Typography>

          {/* Varieties */}
          <Grid2
            container
            direction="row"
            alignItems={{ xxs: 'center', md: 'stretch' }}
            justifyContent={{ xxs: 'center', md: 'space-around' }}
            spacing={4}
            wrap="wrap"
            width="100%"
          >
            {officialArtworkSprites.front_default && (
              <Grid2
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                size={{ xxs: 12, sm: 6, md: 3 }}
                gap={2}
              >
                <SpriteContainer width={{ xxs: '100%', md: 'auto' }}>
                  <Sprite
                    alt="Official Artwork Front Default"
                    src={officialArtworkSprites.front_default}
                    height="180"
                  />
                </SpriteContainer>
                <p>{defaultVarietyName}</p>
              </Grid2>
            )}

            {(dreamWorldSprites.front_default || dreamWorldSprites.front_female) && (
              <Grid2
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                size={{ xxs: 12, sm: 6, md: 3 }}
                gap={2}
              >
                <Stack flexDirection="row" justifyContent="center" flexWrap="wrap">
                  {Object.entries(dreamWorldSprites).map(
                    ([key, value]) =>
                      value && (
                        <SpriteContainer key={`dreamworld-sprite-${key}`}>
                          <Sprite
                            alt={`DreamWorld Design ${removeUnderscore(key)}`}
                            src={value}
                            height="170"
                          />
                        </SpriteContainer>
                      ),
                  )}
                </Stack>
                <p>Dream World</p>
              </Grid2>
            )}

            {alternativeForms.map(({ name }) => (
              <Grid2
                flexDirection="column"
                alignItems="center"
                justifyContent="space-between"
                size={{ xxs: 12, sm: 6, md: 3 }}
                gap={2}
                key={`pokemon-variety-${name}`}
              >
                <SpriteContainer width={{ xxs: '100%', md: 'auto' }}>
                  <Sprite
                    alt="Official Artwork Front Default"
                    src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${prefixId(
                      pokemonId,
                    )}-${name.replace(/ /g, '-')}.png`}
                    height="180"
                  />
                </SpriteContainer>
                <p>{name}</p>
              </Grid2>
            ))}
          </Grid2>
        </>
      ) : (
        <Typography variant="sectionMessage">No sprites available for this Pokémon.</Typography>
      )}
    </Stack>
  );
};

export default Sprites;
