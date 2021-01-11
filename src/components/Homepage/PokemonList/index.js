import { useSelector } from 'react-redux'
// components
import Box from '../../Box'
import InfiniteScroll from '../../InfiniteScroll'
// styles
import { SectionTitle } from '../../BaseStyles'
import { Container } from './StyledPokemonList'

export default function PokemonList() {
  const pokemon = useSelector(state => state.home.pokemon)

  return (
    <>
      {pokemon && (
        <Container>
          <Box constrained withGutter margin="3rem 0">
            <SectionTitle>Select your Pokemon</SectionTitle>
            <InfiniteScroll pokemonList={pokemon} />
          </Box>
        </Container>
      )}
    </>
  )
}
