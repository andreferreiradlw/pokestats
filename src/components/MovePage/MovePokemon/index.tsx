import { useMemo } from 'react';
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
  // memo
  const displayPokemon = useMemo(
    () => pokemonList.filter(pokemon => pokemon.id <= 905),
    [pokemonList],
  );

  return (
    <Box flexalign="flex-start" flexjustify="flex-start" flexgap="1em" {...rest}>
      <SectionTitle>{`Learnset (${displayPokemon?.length})`}</SectionTitle>
      <InfiniteScroll pokemonList={displayPokemon} />
    </Box>
  );
};

export default MovePokemon;
