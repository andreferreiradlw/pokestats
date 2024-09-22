// helpers
import { usePlausible } from 'next-plausible';
import { hoverVariant } from '@/animations';
import { useBreakpoint } from '@/hooks';
// styles
import { FooterContainer, PokestatsIcon, Anchor, FooterContent } from './StyledFooter';
// components
import { motion } from 'framer-motion';
import { Container, Grid2, Link } from '@mui/material';
import ImageNextV2 from '@/components/ImageNextV2';

const Footer = (): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  // breakpoint
  const isMdUp = useBreakpoint({ breakpoint: 'md' });

  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <FooterContent size={12} container spacing={2}>
          {isMdUp && (
            <Grid2 size={5} alignItems="center" justifyContent="flex-start" gap={4}>
              <Link
                href="https://github.com/andreferreiradlw/pokestats"
                target="_blank"
                rel="noopener"
                onClick={() => plausible('Github Footer')}
              >
                Github
              </Link>
              <Link
                href="https://github.com/andreferreiradlw/pokestats/issues"
                target="_blank"
                rel="noopener"
                onClick={() => plausible('Open Issue Footer')}
              >
                Open Issue
              </Link>
            </Grid2>
          )}
          <Grid2
            size={{ xxs: 12, md: 2 }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            whiteSpace="nowrap"
          >
            <PokestatsIcon />
            {`© Pokestats.gg ${new Date().getFullYear()} `}
          </Grid2>
          {isMdUp && (
            <Grid2
              size={5}
              direction="row"
              alignItems="center"
              justifyContent={{ xxs: 'center', md: 'flex-end' }}
              gap={0.5}
              flexShrink="0"
            >
              Powered by
              <motion.span
                initial="rest"
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
                  <ImageNextV2
                    imageUrl="/static/pokeapi_logo.png"
                    alt="PokeApi Logo"
                    customKey="pokeapi-footer"
                    height={25}
                  />
                </Anchor>
              </motion.span>
            </Grid2>
          )}
          <Grid2 size={12} justifyContent="center" textAlign="center">
            Pokémon are registered trademarks of Nintendo and Game Freak.
          </Grid2>
        </FooterContent>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
