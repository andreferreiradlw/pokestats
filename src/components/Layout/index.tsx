import { CSSProperties } from 'react';
// types
import type { BoxProps } from '@/components/Box';
import type { PokemonSpecies } from 'pokenode-ts';
// helpers
import { GameVersionProvider } from '@/context';
import { fadeInOutUpVariant, scrollToTop } from '@/helpers';
// styles
import { LayoutContainer, MainContainer, ScrollButton } from './StyledLayout';
// hooks
import { useIsClient, useWindowSize } from 'usehooks-ts';
import { useScrollPosition } from '@/hooks';
// components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// icons
import ChevronTop from 'public/static/iconLibrary/chevron_top.svg';
import { AnimatePresence } from 'framer-motion';

interface LayoutProps extends BoxProps {
  layoutGap?: CSSProperties['gap'];
  currPokemon?: PokemonSpecies;
  withHeader?: boolean;
}

const Layout = ({
  layoutGap = '1.5em',
  withHeader,
  currPokemon,
  children,
  ...rest
}: LayoutProps): JSX.Element => {
  // hooks
  const isClient = useIsClient();
  const { width } = useWindowSize();
  const scrollPosition = useScrollPosition();

  return (
    <GameVersionProvider pokemon={currPokemon}>
      <LayoutContainer
        flexdirection="column"
        width="100%"
        flexgap={layoutGap}
        $isRelative
        {...rest}
      >
        {withHeader && <Header currPokemon={currPokemon} />}
        {children}
        <Footer />
        <AnimatePresence>
          {width > 768 && scrollPosition > 1000 && (
            <ScrollButton
              onClick={isClient && scrollToTop}
              whileHover="hover"
              whileTap="tap"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={fadeInOutUpVariant}
              key="layout-back-top"
            >
              <ChevronTop width="50px" />
            </ScrollButton>
          )}
        </AnimatePresence>
      </LayoutContainer>
    </GameVersionProvider>
  );
};

export default Layout;
export { MainContainer };
