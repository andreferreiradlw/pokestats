// helpers
import { usePlausible } from 'next-plausible';
import { hoverVariant } from '@/animations';
// styles
import {
  FooterContainer,
  PokestatsIcon,
  Anchor,
  FooterContainerInner,
  FooterContent,
} from './StyledFooter';
// components
import ImageNext from '@/components/ImageNext';
import { motion } from 'framer-motion';
import { Divider, Stack } from '@mui/material';

const Footer = (): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  return (
    <FooterContainer>
      <FooterContainerInner maxWidth="xl">
        <Divider />
        <FooterContent>
          <Stack alignItems={{ xxs: 'center', md: 'flex-start' }} gap="1em">
            <Stack gap="0.5em" direction="row">
              <PokestatsIcon />
              <Stack direction="row" gap="0.2em">
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
              </Stack>
            </Stack>
            Pokémon are registered trademarks of Nintendo and Game Freak.
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ xxs: 'center', md: 'flex-start' }}
            gap="0.2em"
            width={{ xxs: '100%', md: 'auto' }}
            flexShrink="0"
          >
            Powered by
            <motion.span
              whileHover="hover"
              whileTap="tap"
              variants={hoverVariant}
              key="pokeapi-anchor-footer"
            >
              <Anchor
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener"
                onClick={() => plausible('Pokeapi Footer')}
              >
                <ImageNext src="/static/pokeapi_logo.png" alt="PokeApi Logo" height={25} />
              </Anchor>
            </motion.span>
          </Stack>
        </FooterContent>
      </FooterContainerInner>
    </FooterContainer>
  );
};

export default Footer;
