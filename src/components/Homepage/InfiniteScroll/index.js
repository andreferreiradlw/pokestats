import Box from '../../Box'
import PokemonBox from './PokemonBox'
// styles
import { Container, List } from './StyledInfiniteScroll'

export default function InfiniteScroll({ ...rest }) {
  return (
    <Container {...rest}>
      <List
        withGutter
        constrained
        margin="2rem 0"
        direction="row"
        align="flex-start"
        justify="flex-start"
      >
        LIST here
      </List>
    </Container>
  )
}
