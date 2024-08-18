// types
import type { PokemonSpecies } from 'pokenode-ts';
// components
import Link from 'next/link';
import Box, { BoxProps } from '@/components/Box';
// styles
import { HeaderContainer, PokestatsLogo } from './styledHeader';
import GameGenSelect from '../GameGenSelect';
import AutocompleteV2 from '../AutocompleteV2';

interface HeaderComponentProps extends BoxProps {
  currPokemon?: PokemonSpecies;
}

const HeaderComponent = ({ currPokemon, ...rest }: HeaderComponentProps): JSX.Element => (
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
        {currPokemon && <GameGenSelect />}
      </Box>
      <AutocompleteV2 width="350px" autocompleteOptions={{ size: 'small' }} />
    </Box>
  </HeaderContainer>
);

export default HeaderComponent;
