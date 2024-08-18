import { useMemo } from 'react';
// types
import type { NamedAPIResource } from 'pokenode-ts';
// styles
import { SectionTitle } from '@/BaseStyles';
// components
import Box, { BoxProps } from '@/components/Box';
import InfiniteScroll from '@/components/InfiniteScroll';
// helpers
import { getResourceId } from '@/helpers';

interface MovePokemonProps extends BoxProps {
  pokemonList: NamedAPIResource[];
}

const MovePokemon = ({ pokemonList, ...rest }: MovePokemonProps): JSX.Element => {
  // memo
  const displayPokemon = useMemo(
    () => pokemonList.filter(({ url }) => getResourceId(url) <= 905),
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
