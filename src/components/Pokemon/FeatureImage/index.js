// styles
import { ImageContainer, Image } from './StyledFeatureImage'

import React from 'react'

export default function FeaturedImage({ pokemonName, pokemonId, ...rest }) {
  return (
    <ImageContainer {...rest}>
      <Image
        alt={pokemonName}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
      />
    </ImageContainer>
  )
}
