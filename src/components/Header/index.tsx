import { useContext } from 'react';
// helpers
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { gameVersions, checkIfEarlierGen } from '@/helpers';
// components
import Link from 'next/link';
import Box, { BoxProps } from '@/components/Box';
import Autocomplete, { AutocompleteProps } from '@/components/Autocomplete';
// styles
import { Select } from '@/components/BaseStyles';
import { HeaderContainer, Heading, SelectContainer } from './styledHeader';

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

  return (
    <HeaderContainer {...rest}>
      <Box
        $constrained
        $withGutter
        flexdirection={{ xxs: 'column', md: 'row' }}
        flexjustify="space-between"
        flexalign={{ xxs: 'center', md: 'flex-start' }}
        flexmargin="auto"
        flexgap="1em"
      >
        <Box width="auto" flexjustify="flex-start" flexalign="flex-start">
          <Link href="/">
            <Heading>PokeStats</Heading>
          </Link>
          {/** Select */}
          {pokemonGen && (
            <SelectContainer flexdirection="row" flexjustify="flex-start" flexgap="0.5em">
              <label id="header_generation" htmlFor="header_gen_select">
                Game Version:
              </label>
              <Select
                aria-labelledby="header_generation"
                id="header_gen_select"
                value={gameVersion}
                onChange={e => setGameVersion(e.target.value)}
              >
                {gameVersions.map(
                  ({ name, value }, index) =>
                    !checkIfEarlierGen(pokemonGen, value) && (
                      <option key={index} value={value}>
                        {name}
                      </option>
                    ),
                )}
              </Select>
            </SelectContainer>
          )}
        </Box>
        <Autocomplete
          filterList={autocompleteList}
          width="350px"
          flexjustify="flex-end"
          flexalign="flex-start"
          flexmargin="none"
        />
      </Box>
    </HeaderContainer>
  );
};

export default HeaderComponent;
