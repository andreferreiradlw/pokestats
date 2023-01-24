// types
import type { Pokemon } from '@/types';
// styles
import { SectionTitle } from '@/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';
import InfiniteScroll from '@/components/InfiniteScroll';

interface MovePokemonProps extends BoxProps {
  pokemonList: Pokemon[];
}

const MovePokemon = ({ pokemonList, ...rest }: MovePokemonProps): JSX.Element => {
  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1em" {...rest}>
      <SectionTitle>{`Learnset (${pokemonList.length})`}</SectionTitle>
      <InfiniteScroll screensizes={12} pokemonList={pokemonList} />
    </Box>
  );
};

export default MovePokemon;
