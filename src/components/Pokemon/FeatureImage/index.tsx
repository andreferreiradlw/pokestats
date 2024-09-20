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
  specieNames: PokemonSpecies['names'];
  pokemonId: Pokemon['id'];
}

export type PokemonVersion = 'normal' | 'shiny';

const FeaturedImage = ({ specieNames, pokemonId, ...rest }: FeaturedImageProps): JSX.Element => {
  // state
  const [version, setVersion] = useState<PokemonVersion>('normal');

  // memo
  const englishName = useMemo(
    () => specieNames.find(name => name.language.name === 'en')?.name,
    [specieNames],
  );

  const hiraganaName = useMemo(
    () => specieNames.find(name => name.language.name === 'ja')?.name,
    [specieNames],
  );

  const imageURL = useMemo(() => {
    if (version === 'normal') {
      const formattedId = formatPokemonId(pokemonId);

      return `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formattedId}.png`;
    }

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemonId}.png`;
  }, [pokemonId, version]);

  return (
    <Grid2 flexDirection="column" spacing={2} {...rest}>
      <ImageContainer alignItems="center" justifyContent="center" size={12} version={version}>
        <ImageNextV2
          imageProps={{ priority: true }}
          placeholderwidth="20%"
          alt={englishName!}
          imageUrl={imageURL}
          customKey={`${pokemonId}-feature-image-${version}`}
        />
        {specieNames && (
          <JpnName
            initial="hidden"
            animate="show"
            variants={scaleInVariant}
            key={`jpn-name-${pokemonId}`}
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
