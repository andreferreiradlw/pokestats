// components
import Image from '../../Image'
// styles
import { ImageContainer } from './StyledFeatureImage'

export default function FeaturedImage({ pokemonName, pokemonId, ...rest }) {
  return (
    <ImageContainer {...rest}>
      <Image
        notLazy
        placeholderwidth="20%"
        alt={pokemonName}
        key={`featured-${pokemonName}-${pokemonId}`}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
      />
    </ImageContainer>
  )
}
