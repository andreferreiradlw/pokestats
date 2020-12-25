import { useSelector } from 'react-redux'
// components
import Box from '../../Box'
import Details from './Details'
import Training from './Training'
import Breeding from './Breeding'
// styles
import { ImageContainer, Image } from './StyledInfo'

export default function Info() {
  // pokemon info
  const pokemonInfo = useSelector((state) => state.pokemon.info)

  // data
  const { id } = pokemonInfo.data

  return (
    <Box
      as="section"
      direction={{ xxs: 'column', lg: 'row' }}
      margin="0 0 2rem"
      constrained
    >
      <Details sizes={5} align="flex-start" />
      <Box sizes={7}>
        <ImageContainer sizes={12}>
          <Image
            src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          />
        </ImageContainer>

        <Box direction={{ xxs: 'column', sm: 'row' }}>
          <Training />
          <Breeding />
        </Box>
      </Box>
    </Box>
  )
}
