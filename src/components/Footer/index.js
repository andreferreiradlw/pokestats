import Box from '../Box'
// styles
import { FooterContainer } from './StyledFooter'

export default function Footer() {
  return (
    <FooterContainer as="footer" margin="0 0 1rem" withGutter>
      <Box
        constrained
        direction="row"
        justify="space-between"
        margin="auto"
        padding="1rem 0"
      >
        Footer
      </Box>
    </FooterContainer>
  )
}
