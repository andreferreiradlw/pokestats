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
  children?: React.ReactNode;
  withFooter?: boolean;
  withHeader?: boolean;
  withMain?: boolean;
  withGameVersion?: boolean;
  mainKey?: string;
  autocompleteList?: AutocompleteProps['filterList'];
}

const Layout = ({
  withFooter,
  withHeader,
  withMain = true,
  withGameVersion = true,
  children,
  mainKey,
  autocompleteList,
  ...rest
}: LayoutProps): JSX.Element => {
  // game version
  const [gameVersion, setGameVersion] = useState('');

  const VersionContextValue = useMemo(
    () => ({
      gameVersion,
      setGameVersion,
    }),
    [gameVersion, setGameVersion],
  );

  return (
    <GameVersionContext.Provider value={VersionContextValue}>
      <LayoutContainer direction="column" width="100%">
        {withHeader && autocompleteList && (
          <Header autocompleteList={autocompleteList} withGameVersion={withGameVersion} />
        )}
        {withMain ? (
          <MainContainer key={mainKey} {...rest}>
            {children}
          </MainContainer>
        ) : (
          children
        )}
        {withFooter && <Footer />}
      </LayoutContainer>
    </GameVersionContext.Provider>
  );
};

export default Layout;
export { MainContainer };
