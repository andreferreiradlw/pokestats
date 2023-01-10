// styles
import { FooterContainer, FooterA, TextContainer } from './StyledFooter';
// components
import Box from '@/components/Box';
import Image from 'next/image';
// icons
import GitHub from 'public/static/iconLibrary/github.svg';

const Footer = (): JSX.Element => (
  <FooterContainer>
    <Box
      flexdirection={{ xxs: 'column', sm: 'row' }}
      flexalign={{ xxs: 'flex-start', sm: 'center' }}
      flexjustify={{ xxs: 'center', sm: 'space-between' }}
      flexmargin="auto"
      screensizes={12}
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
