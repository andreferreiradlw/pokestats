import { useMemo } from 'react';
// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
// helpers
import { formatPokemonId } from '@/helpers';
import { scaleInVariant } from '@/animations';
// styles
import { JpnName } from '@/components/BaseStyles';
import { ImageContainer } from './StyledFeatureImage';
// components
import ImageNext from '@/components/ImageNext';
import type { Grid2Props } from '@mui/material';

interface FeaturedImageProps extends Grid2Props {
  specieNames: PokemonSpecies['names'];
  pokemonId: Pokemon['id'];
}

const FeaturedImage = ({ specieNames, pokemonId, ...rest }: FeaturedImageProps): JSX.Element => {
  // memo
  const englishName = useMemo(
    () => specieNames.find(name => name.language.name === 'en')?.name,
    [specieNames],
  );
  const hiraganaName = useMemo(
    () => specieNames.find(name => name.language.name === 'ja')?.name,
    [specieNames],
  );

  return (
    <ImageContainer alignItems="center" justifyContent="center" {...rest}>
      <ImageNext
        priority
        loading="eager"
        placeholderwidth="20%"
        alt={englishName!}
        src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(
          pokemonId,
        )}.png`}
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
  );
};

export default FeaturedImage;
