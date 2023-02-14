import { useState, useMemo, CSSProperties } from 'react';
// types
import type { MoveType, Pokemon, PokemonType } from '@/types';
import type { BoxProps } from '@/components/Box';
import type { PokemonSpecies } from 'pokenode-ts';
// helpers
import GameVersionContext from './gameVersionContext';
import { fadeInOutUpVariant, mapGeneration, scrollToTop } from '@/helpers';
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
  withHeader?: {
    currPokemon?: PokemonSpecies;
    autocompleteList: (Pokemon | PokemonType | MoveType)[];
  };
}

const Layout = ({
  layoutGap = '1.5em',
  withHeader,
  children,
  ...rest
}: LayoutProps): JSX.Element => {
  const pokemonGen = mapGeneration(withHeader?.currPokemon?.generation?.name);
  // game version
  const [gameVersion, setGameVersion] = useState(pokemonGen);
  // hooks
  const isClient = useIsClient();
  const { width } = useWindowSize();
  const scrollPosition = useScrollPosition();

  const VersionContextValue = useMemo(
    () => ({
      gameVersion,
      setGameVersion,
    }),
    [gameVersion, setGameVersion],
  );

  return (
    <GameVersionContext.Provider value={VersionContextValue}>
      <LayoutContainer
        flexdirection="column"
        width="100%"
        flexgap={layoutGap}
        $isRelative
        {...rest}
      >
        {withHeader && (
          <Header
            autocompleteList={withHeader.autocompleteList}
            currPokemon={withHeader?.currPokemon}
          />
        )}
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
    </GameVersionContext.Provider>
  );
};

export default Layout;
export { MainContainer };
