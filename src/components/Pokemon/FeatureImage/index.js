// styles
import { ImageContainer, FeatureImage } from './StyledFeatureImage'

import React from 'react'

export default function FeaturedImage({ pokemonName, pokemonId, ...rest }) {
  return (
    <ImageContainer {...rest}>
      <FeatureImage
        iconWidth="20%"
        height={350}
        alt={pokemonName}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
      />
    </ImageContainer>
  )
}
