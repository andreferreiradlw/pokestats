// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
import type { BoxProps } from '@/components/Box';
import { useMemo } from 'react';
// helpers
import { scaleInVariant } from '@/helpers/animations';
// styles
import { JpnName } from '@/components/BaseStyles';
import { ImageContainer } from './StyledFeatureImage';
// components
import ImageNext from '@/components/ImageNext';

interface FeaturedImageProps extends BoxProps {
  specieNames: PokemonSpecies['names'];
  pokemonName: Pokemon['name'];
  pokemonId: Pokemon['id'];
}

const FeaturedImage = ({
  specieNames,
  pokemonName,
  pokemonId,
  ...rest
}: FeaturedImageProps): JSX.Element => {
  // memo
  const englishName = useMemo(
    () => specieNames?.find(name => name.language.name === 'en').name,
    [specieNames],
  );
  const hiraganaName = useMemo(
    () => specieNames?.find(name => name.language.name === 'ja').name,
    [specieNames],
  );

  return (
    <ImageContainer {...rest}>
      <ImageNext
        priority
        loading="eager"
        placeholderwidth="20%"
        alt={englishName}
        src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${pokemonId
          .toString()
          .padStart(3, '0')}.png`}
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
