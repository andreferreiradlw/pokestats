import Box from '../Box'
// styles
import { FooterContainer, FooterA } from './StyledFooter'
// icons
import GitHub from '../../assets/svg/github.svg'
import PokeApi from '../../assets/pokeapi_logo.png'

export default function Footer() {
  return (
    <FooterContainer forwardedAs="footer" withGutter>
      <Box
        constrained
        direction={{ xxs: 'column', sm: 'row' }}
        align={{ xxs: 'flex-start', sm: 'center' }}
        justify={{ xxs: 'center', sm: 'space-between' }}
        margin="auto"
        padding="1rem 0 0 "
      >
        <span>
          {`Developed by `}{' '}
          <FooterA href="https://andreferreira.tech" target="_blank">
            André
          </FooterA>
          {`, Powered by `}{' '}
          <FooterA href="https://pokeapi.co/" target="_blank">
            <img src={PokeApi} />
          </FooterA>
        </span>
        <span as="span">
          <FooterA
            href="https://github.com/andreferreiradlw/pokestats"
            target="_blank"
          >
            GitHub
            <GitHub />
          </FooterA>
        </span>
      </Box>
    </FooterContainer>
  )
}
