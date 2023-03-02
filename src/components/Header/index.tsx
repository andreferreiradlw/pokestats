import { useContext, useEffect, useState } from 'react';
// types
import type { PokemonSpecies } from 'pokenode-ts';
import type { MoveType, Pokemon, PokemonType } from '@/types';
// helpers
import { usePlausible } from 'next-plausible';
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { gameVersions, checkIfEarlierGen, mapGenerationToGame } from '@/helpers';
// components
import Link from 'next/link';
import Box, { BoxProps } from '@/components/Box';
import Autocomplete from '@/components/Autocomplete';
import Dropdown from '@/components/Dropdown';
// styles
import { HeaderContainer, PokestatsLogo } from './styledHeader';

interface HeaderComponentProps extends BoxProps {
  autocompleteList: (Pokemon | PokemonType | MoveType)[];
  currPokemon?: PokemonSpecies;
}
type GameVersions = typeof gameVersions;

const HeaderComponent = ({
  autocompleteList,
  currPokemon,
  ...rest
}: HeaderComponentProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();
  // gen
  const pokemonGen = currPokemon?.generation.name;
  // game version
  const { gameVersion, setGameVersion } = useContext(GameVersionContext);
  // state
  const [dropdownOptions, setDropdownOptions] = useState<GameVersions>();

  useEffect(() => {
    if (currPokemon) {
      const currGame = mapGenerationToGame(pokemonGen, currPokemon.id);

      const currPokemonVersions = gameVersions.filter(
        version => !checkIfEarlierGen(currGame, version.value),
      );

      setDropdownOptions(currPokemonVersions);

      if (currPokemonVersions.findIndex(game => game.value === gameVersion) < 0) {
        setGameVersion(currPokemonVersions[0].value);
      }
    }
  }, [currPokemon]);

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
          {pokemonGen && !!dropdownOptions?.length && (
            <Dropdown
              label="Game Version"
              options={dropdownOptions}
              value={gameVersion}
              onChange={e => {
                setGameVersion(e.target.value);
                plausible('Game Version Select');
              }}
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
