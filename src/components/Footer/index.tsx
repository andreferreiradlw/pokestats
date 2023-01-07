// styles
import { FooterContainer, FooterA, TextContainer } from './StyledFooter';
// components
import Box from '@/components/Box';
import Image from 'next/image';
// icons
import GitHub from '@/assets/svg/github.svg';

const Footer = (): JSX.Element => (
  <FooterContainer>
    <Box
      $direction={{ xxs: 'column', sm: 'row' }}
      $align={{ xxs: 'flex-start', sm: 'center' }}
      $justify={{ xxs: 'center', sm: 'space-between' }}
      $margin="auto"
      sizes={12}
      $constrained
      $withGutter
    >
      <TextContainer>
        <FooterA href="https://pokeapi.co/" target="_blank" rel="noopener" aria-label="PokeApi">
          {`Powered by`}{' '}
          <Image
            src="/static/pokeapi_logo.png"
            alt="PokeApi Logo"
            loading="lazy"
            width={60}
            height={25}
          />
        </FooterA>
        <FooterA href="https://andreferreira.tech" target="_blank" rel="noopener">
          and created by Andre.
        </FooterA>
      </TextContainer>
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

export default Footer;
