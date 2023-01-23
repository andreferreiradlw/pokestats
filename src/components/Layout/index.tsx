import { useState, useMemo, CSSProperties } from 'react';
// types
import type { AutocompleteProps } from '@/components/Autocomplete';
import type { BoxProps } from '@/components/Box';
import type { PokemonSpecies } from 'pokenode-ts';
// helpers
import GameVersionContext from './gameVersionContext';
import { LayoutContainer, MainContainer } from './StyledLayout';
// components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mapGeneration } from '@/helpers';

interface LayoutProps extends BoxProps {
  layoutGap?: CSSProperties['gap'];
  withHeader?: {
    currPokemon?: PokemonSpecies;
    autocompleteList: AutocompleteProps['filterList'];
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

  const VersionContextValue = useMemo(
    () => ({
      gameVersion,
      setGameVersion,
    }),
    [gameVersion, setGameVersion],
  );

  return (
    <GameVersionContext.Provider value={VersionContextValue}>
      <LayoutContainer flexdirection="column" width="100%" flexgap={layoutGap} {...rest}>
        {withHeader && (
          <Header
            autocompleteList={withHeader.autocompleteList}
            currPokemon={withHeader?.currPokemon}
          />
        )}
        {children}
        <Footer />
      </LayoutContainer>
    </GameVersionContext.Provider>
  );
};

export default Layout;
export { MainContainer };
