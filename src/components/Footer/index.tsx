// helpers
import { fadeInUpVariant } from '@/helpers';
// styles
import { FooterContainer, PokestatsIcon, Anchor } from './StyledFooter';
// components
import Box from '@/components/Box';
import BoxWrapper from '../Box/StyledBox';
import ImageNext from '@/components/ImageNext';
import { motion } from 'framer-motion';

const Footer = (): JSX.Element => {
  const githubClick = () => {
    if (process.env.NODE_ENV === 'production' && window?.plausible)
      window.plausible('Github Footer');
  };
  const pokeapiClick = () => {
    if (process.env.NODE_ENV === 'production' && window?.plausible)
      window.plausible('Pokeapi Footer');
  };

  return (
    <FooterContainer>
      <Box
        flexdirection={{ xxs: 'column', sm: 'row' }}
        flexalign={{ xxs: 'flex-start', sm: 'center' }}
        flexjustify={{ xxs: 'center', sm: 'space-between' }}
        flexgap="1em"
        screensizes={12}
        $contained
        $withGutter
      >
        <Box flexgap="0.5em" flexdirection="row" width="auto">
          <PokestatsIcon />
          <BoxWrapper flexdirection="row" flexgap="0.2em" width="auto">
            {`© ${new Date().getFullYear()} `}
            <Anchor
              as="a"
              href="https://github.com/andreferreiradlw/pokestats"
              target="_blank"
              rel="noopener"
              onClick={githubClick}
            >
              Pokestats
            </Anchor>
          </BoxWrapper>
        </Box>
        <BoxWrapper flexdirection="row" flexalign="center" flexgap="0.2em" width="auto">
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
              onClick={pokeapiClick}
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
