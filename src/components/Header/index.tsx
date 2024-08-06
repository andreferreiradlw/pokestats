// types
import type { PokemonSpecies } from 'pokenode-ts';
import type { MoveType, Pokemon, PokemonType } from '@/types';
// components
import Link from 'next/link';
import Box, { BoxProps } from '@/components/Box';
import Autocomplete from '@/components/Autocomplete';
// styles
import { HeaderContainer, PokestatsLogo } from './styledHeader';
import GameGenSelect from '../GameGenSelect';

interface HeaderComponentProps extends BoxProps {
  autocompleteList: (Pokemon | PokemonType | MoveType)[];
  currPokemon?: PokemonSpecies;
}

const HeaderComponent = ({
  autocompleteList,
  currPokemon,
  ...rest
}: HeaderComponentProps): JSX.Element => {
  // gen
  const pokemonGen = currPokemon?.generation.name;

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
          {pokemonGen && <GameGenSelect pokemon={currPokemon} />}
        </Box>
        <Autocomplete filterList={autocompleteList} width="350px" />
      </Box>
    </HeaderContainer>
  );
};

export default HeaderComponent;
