// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
import type { BoxProps } from '@/components/Box';
// components
import Image from '@/components/Image';
// helpers
import { scaleInVariant } from '@/helpers/animations';
// styles
import { JpnName } from '@/components/BaseStyles';
import { ImageContainer } from './StyledFeatureImage';

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
  return (
    <ImageContainer {...rest}>
      <Image
        lazy={false}
        placeholderwidth="20%"
        alt={specieNames?.find(name => name.language.name === 'en').name}
        key={`featured-${pokemonName}-${pokemonId}`}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
      />
      {specieNames && (
        <JpnName
          initial="hidden"
          animate="show"
          variants={scaleInVariant}
          key={`jpn-name-${pokemonId}`}
        >
          {specieNames.find(name => name.language.name === 'ja').name}
        </JpnName>
      )}
    </ImageContainer>
  );
};

export default FeaturedImage;
