// helpers
import { usePlausible } from 'next-plausible';
import { fadeInUpVariant } from '@/helpers';
// styles
import { FooterContainer, PokestatsIcon, Anchor } from './StyledFooter';
// components
import Box from '@/components/Box';
import BoxWrapper from '../Box/StyledBox';
import ImageNext from '@/components/ImageNext';
import { motion } from 'framer-motion';

const Footer = (): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  return (
    <FooterContainer>
      <Box
        flexdirection={{ xxs: 'column', sm: 'row' }}
        flexalign="flex-start"
        flexjustify={{ xxs: 'center', sm: 'space-between' }}
        flexgap="1em"
        screensizes={12}
        flextextalign={{ xxs: 'center', sm: 'left' }}
        $contained
        $withGutter
      >
        <Box flexalign={{ xxs: 'center', sm: 'flex-start' }} flexgap="1em" width="auto">
          <Box flexgap="0.5em" flexdirection="row" width="auto">
            <PokestatsIcon />
            <BoxWrapper flexdirection="row" flexgap="0.2em" width="auto">
              {`© ${new Date().getFullYear()} `}
              <Anchor
                as="a"
                href="https://github.com/andreferreiradlw/pokestats"
                target="_blank"
                rel="noopener"
                onClick={() => plausible('Github Footer')}
              >
                Pokestats
              </Anchor>
            </BoxWrapper>
          </Box>
          Pokémon are registered trademarks of Nintendo and Game Freak.
        </Box>
        <BoxWrapper
          flexdirection="row"
          flexalign="center"
          flexjustify={{ xxs: 'center', sm: 'flex-start' }}
          flexgap="0.2em"
          width={{ xxs: '100%', sm: 'auto' }}
          flexshrink="0"
        >
          Powered by
          <motion.span
            whileHover="hover"
            whileTap="tap"
            variants={fadeInUpVariant}
            key="pokeapi-anchor-footer"
          >
            <Anchor
              as="a"
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener"
              onClick={() => plausible('Pokeapi Footer')}
            >
              <ImageNext src="/static/pokeapi_logo.png" alt="PokeApi Logo" height={25} />
            </Anchor>
          </motion.span>
        </BoxWrapper>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
