import { useMemo, useState } from 'react';
// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
// helpers
import { formatPokemonId } from '@/helpers';
import { scaleInVariant } from '@/animations';
// styles
import { JpnName } from '@/components/BaseStyles';
import { ImageContainer } from './StyledFeatureImage';
// components
import { Grid2, ToggleButton, ToggleButtonGroup, type Grid2Props } from '@mui/material';
import ImageNextV2 from '@/components/ImageNextV2';

interface FeaturedImageProps extends Grid2Props {
  species: PokemonSpecies;
  pokemon: Pokemon;
}

export type PokemonVersion = 'normal' | 'shiny';

const FeaturedImage = ({ species, pokemon, ...rest }: FeaturedImageProps): JSX.Element => {
  // data
  const { sprites } = pokemon;
  const { names, varieties, id } = species;

  // state
  const [version, setVersion] = useState<PokemonVersion>('normal');

  // memo
  const englishName = useMemo(() => names.find(name => name.language.name === 'en')?.name, [names]);

  const hiraganaName = useMemo(
    () => names.find(name => name.language.name === 'ja')?.name,
    [names],
  );

  const imageURL = useMemo(() => {
    if (varieties.length > 1) {
      return version === 'normal'
        ? (sprites.other?.['official-artwork'].front_default as string)
        : // @ts-expect-error: incorrect type
          (sprites.other?.['official-artwork'].front_shiny as string);
    }

    return version === 'normal'
      ? `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(id)}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
  }, [id, version, varieties, sprites]);

  return (
    <Grid2 flexDirection="column" spacing={2} {...rest}>
      <ImageContainer alignItems="center" justifyContent="center" size={12} version={version}>
        <ImageNextV2
          imageProps={{ priority: true }}
          placeholderwidth="20%"
          alt={englishName!}
          imageUrl={imageURL}
          customKey={`${id}-feature-image-${version}`}
        />
        {hiraganaName && (
          <JpnName
            initial="hidden"
            animate="show"
            variants={scaleInVariant}
            key={`hiragana-name-${id}`}
          >
            {hiraganaName}
          </JpnName>
        )}
      </ImageContainer>
      <Grid2 size={12} justifyContent="center">
        <ToggleButtonGroup
          size="small"
          color="secondary"
          value={version}
          exclusive
          onChange={(_, value) => setVersion(value)}
          aria-label="Pokémon Version"
        >
          <ToggleButton disableRipple disabled={version === 'normal'} value="normal">
            Normal
          </ToggleButton>
          <ToggleButton disableRipple disabled={version === 'shiny'} value="shiny">
            Shiny
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid2>
    </Grid2>
  );
};

export default FeaturedImage;
