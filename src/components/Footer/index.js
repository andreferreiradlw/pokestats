import Box from '../Box'
// helpers
import { footerVariant } from '../../helpers/animations'
// styles
import { FooterContainer, FooterA } from './StyledFooter'
// icons
import GitHub from '../../assets/svg/github.svg'
import PokeApi from '../../assets/pokeapi_logo.png'

export default function Footer({ ...rest }) {
  return (
    <FooterContainer
      initial="hidden"
      animate="show"
      variants={footerVariant}
      key="layout-footer"
      {...rest}
    >
      <Box
        direction={{ xxs: 'column', sm: 'row' }}
        align={{ xxs: 'flex-start', sm: 'center' }}
        justify={{ xxs: 'center', sm: 'space-between' }}
        margin="auto"
        sizes={12}
        constrained
        withGutter
      >
        <span>
          {`Created by `}{' '}
          <FooterA
            href="https://andreferreira.tech"
            target="_blank"
            rel="noopener"
          >
            André
          </FooterA>
          {`, powered by `}{' '}
          <FooterA
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener"
            aria-label="PokeApi"
          >
            <img src={PokeApi} alt="PokeApi Logo" />
          </FooterA>
        </span>
        <span as="span">
          <FooterA
            href="https://github.com/andreferreiradlw/pokestats"
            target="_blank"
            rel="noopener"
          >
            GitHub
            <GitHub />
          </FooterA>
        </span>
      </Box>
    </FooterContainer>
  )
}
