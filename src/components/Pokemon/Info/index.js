import { useSelector } from 'react-redux'
// helpers
import { capitalize } from '../../../helpers/typography'
// components
import { Name, Id, ImageContainer, Image } from './StyledInfo'
import Box from '../../Box'

export default function Info() {
  // pokemon info
  const pokemonInfo = useSelector((state) => state.pokemon.info)

  const { abilities, id, name } = pokemonInfo.data

  return (
    <Box as="section" width="100%" noGutter>
      <Box direction="row" align="flex-end" justify="center" margin="2rem 0">
        <Name>{capitalize(name)}</Name>
        <Id>#{id}</Id>
      </Box>
      <Box direction={{ xxs: 'column', md: 'row' }} noGutter width="100%">
        <ImageContainer sizes={{ xxs: 12, md: 6 }} justify="flex-end" debug>
          <Image
            src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
          />
        </ImageContainer>
        <Box
          sizes={{ xxs: 12, md: 6 }}
          direction={{ xxs: 'column', sm: 'row' }}
        >
          <Box>Pokedex Data</Box>
          <Box>Base Stats</Box>
        </Box>
      </Box>
    </Box>
  )
}
