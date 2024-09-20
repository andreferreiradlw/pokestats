import { useMemo } from 'react';
// types
import type { OtherPokemonSprites, Pokemon, PokemonSpecies, PokemonSprites } from 'pokenode-ts';
// helpers
import { removeUnderscore, capitalise, removeDash, formatPokemonId } from '@/helpers';
// styles
import { SpriteContainer, Sprite } from './StyledSprites';
// components
import type { StackProps } from '@mui/material';
import { Divider, Grid2, Stack, Typography } from '@mui/material';
import type { ImageNextV2Props } from '@/components/ImageNextV2';

interface SpritesProps extends StackProps {
  pokemonSprites: PokemonSprites;
  pokemonId: Pokemon['id'];
  forms: PokemonSpecies['varieties'];
}

interface SpriteWithLabelProps {
  src: ImageNextV2Props['imageUrl'];
  alt: ImageNextV2Props['alt'];
  label: string;
  height?: ImageNextV2Props['height'];
  customKey: ImageNextV2Props['customKey'];
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
const SpriteWithLabel = ({
  src,
  alt,
  label,
  height = 100,
  customKey,
}: SpriteWithLabelProps): JSX.Element => (
  <SpriteContainer>
    <Sprite
      imageProps={{ unoptimized: true }}
      alt={alt}
      imageUrl={src}
      height={height}
      pixelatedimg
      customKey={customKey}
    />
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
                    <SpriteWithLabel
                      key={`sprite-${key}`}
                      customKey={`sprite-${key}`}
                      src={value}
                      alt={key}
                      label="Static"
                    />
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
                        customKey={`animated-sprite-${key}`}
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
                    imageUrl={officialArtworkSprites.front_default}
                    height="180px"
                    key={`dreamworld-artwork-${defaultVarietyName}`}
                    customKey={`dreamworld-artwork-${defaultVarietyName}`}
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
                            imageUrl={value}
                            height="170px"
                            key={`dreamworld-artwork-${pokemonId}`}
                            customKey={`dreamworld-artwork-${pokemonId}`}
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
                    alt={`${name} alternate form`}
                    imageUrl={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(
                      pokemonId,
                    )}-${name.replace(/ /g, '-')}.png`}
                    height="180px"
                    key={`form-artwork-${pokemonId}-${name}`}
                    customKey={`form-artwork-${pokemonId}-${name}`}
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
