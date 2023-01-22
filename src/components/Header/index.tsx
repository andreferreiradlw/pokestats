import { useContext, useMemo } from 'react';
// helpers
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { gameVersions, checkIfEarlierGen } from '@/helpers';
// components
import Link from 'next/link';
import Box, { BoxProps } from '@/components/Box';
import Autocomplete, { AutocompleteProps } from '@/components/Autocomplete';
import Dropdown from '@/components/Dropdown';
// styles
import { HeaderContainer, PokestatsLogo } from './styledHeader';

interface HeaderComponentProps extends BoxProps {
  autocompleteList: AutocompleteProps['filterList'];
  pokemonGen?: string;
}

const HeaderComponent = ({
  autocompleteList,
  pokemonGen,
  ...rest
}: HeaderComponentProps): JSX.Element => {
  // game version
  const { gameVersion, setGameVersion } = useContext(GameVersionContext);

  const versionOptions = useMemo(
    () => gameVersions.filter(version => !checkIfEarlierGen(pokemonGen, version.value)),
    [pokemonGen],
  );

  return (
    <HeaderContainer {...rest}>
      <Box
        $contained
        $withGutter
        flexdirection={{ xxs: 'column', md: 'row' }}
        flexjustify="space-between"
        flexalign={{ xxs: 'center', md: 'flex-start' }}
        flexmargin="auto"
        flexgap="1em"
      >
        <Box width="auto" flexjustify="flex-start" flexalign="flex-start">
          <Link href="/">
            <PokestatsLogo>PokeStats</PokestatsLogo>
          </Link>
          {pokemonGen && !!versionOptions?.length && (
            <Dropdown
              label="Game Version"
              options={versionOptions}
              value={gameVersion}
              onChange={e => setGameVersion(e.target.value)}
              minWidth="190px"
            />
          )}
        </Box>
        <Autocomplete filterList={autocompleteList} width="350px" />
      </Box>
    </HeaderContainer>
  );
};

export default HeaderComponent;
