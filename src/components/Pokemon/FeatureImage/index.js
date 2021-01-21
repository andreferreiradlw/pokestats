import LazyLoad from 'react-lazyload'
// styles
import { ImageContainer, Image } from './StyledFeatureImage'

import React from 'react'

export default function FeaturedImage({ pokemonName, pokemonId, ...rest }) {
  return (
    <ImageContainer {...rest}>
      <LazyLoad height={445} once>
        <Image
          alt={pokemonName}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
        />
      </LazyLoad>
    </ImageContainer>
  )
}
