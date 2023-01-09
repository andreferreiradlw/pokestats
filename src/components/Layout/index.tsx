import { useState, useMemo } from 'react';
// types
import type { AutocompleteProps } from '@/components/Autocomplete';
import type { BoxProps } from '@/components/Box';
// helpers
import GameVersionContext from './gameVersionContext';
import { LayoutContainer, MainContainer } from './StyledLayout';
// components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps extends BoxProps {
  withHeader?: {
    pokemonGen?: string;
    autocompleteList: AutocompleteProps['filterList'];
  };
  withMain?: {
    mainKey: string;
  };
}

const Layout = ({ withHeader, withMain, children, ...rest }: LayoutProps): JSX.Element => {
  // game version
  const [gameVersion, setGameVersion] = useState(withHeader?.pokemonGen);

  const VersionContextValue = useMemo(
    () => ({
      gameVersion,
      setGameVersion,
    }),
    [gameVersion, setGameVersion],
  );

  return (
    <GameVersionContext.Provider value={VersionContextValue}>
      <LayoutContainer flexdirection="column" width="100%">
        {withHeader && (
          <Header
            autocompleteList={withHeader.autocompleteList}
            pokemonGen={withHeader?.pokemonGen}
          />
        )}
        {withMain ? (
          <MainContainer key={withMain.mainKey} {...rest}>
            {children}
          </MainContainer>
        ) : (
          children
        )}
        <Footer />
      </LayoutContainer>
    </GameVersionContext.Provider>
  );
};

export default Layout;
export { MainContainer };
