import Box from '../Box';
// helpers
import { footerVariant } from '../../helpers/animations';
// styles
import { FooterContainer, FooterA } from './StyledFooter';
// components
import Image from 'next/image';
// icons
import GitHub from '../../assets/svg/github.svg';

export default function Footer({ ...rest }) {
  return (
    <FooterContainer {...rest}>
      <Box
        direction={{ xxs: 'column', sm: 'row' }}
        align={{ xxs: 'flex-start', sm: 'center' }}
        justify={{ xxs: 'center', sm: 'space-between' }}
        margin="auto"
        sizes={12}
        $constrained
        $withGutter
      >
        <span>
          {`Created by `}{' '}
          <FooterA href="https://andreferreira.tech" target="_blank" rel="noopener">
            André
          </FooterA>
          {`, powered by `}{' '}
          <FooterA href="https://pokeapi.co/" target="_blank" rel="noopener" aria-label="PokeApi">
            <Image
              src="/static/pokeapi_logo.png"
              alt="PokeApi Logo"
              loading="lazy"
              width={60}
              height={25}
            />
          </FooterA>
        </span>
        <span>
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
  );
}
