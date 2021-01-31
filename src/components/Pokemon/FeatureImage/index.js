// components
import Image from '../../Image'
// helpers
import { scaleInVariant } from '../../../helpers/animations'
// styles
import { ImageContainer, JpnName } from './StyledFeatureImage'

export default function FeaturedImage({
  pokemonNames,
  pokemonName,
  pokemonId,
  ...rest
}) {
  return (
    <ImageContainer {...rest}>
      <Image
        notLazy
        placeholderwidth="20%"
        alt={
          pokemonNames &&
          pokemonNames.find(name => name.language.name === 'en').name
        }
        key={`featured-${pokemonName}-${pokemonId}`}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
      />
      {pokemonNames && (
        <JpnName
          initial="hidden"
          animate="show"
          variants={scaleInVariant}
          key={`jpn-name-${pokemonId}`}
        >
          {pokemonNames.find(name => name.language.name === 'ja').name}
        </JpnName>
      )}
    </ImageContainer>
  )
}
