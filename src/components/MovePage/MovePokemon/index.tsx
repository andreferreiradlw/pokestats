import { useMemo } from 'react';
// types
import type { NamedAPIResource } from 'pokenode-ts';
// components
import InfiniteScroll from '@/components/InfiniteScroll';
// helpers
import { getResourceId } from '@/helpers';
import { Stack, StackProps, Typography } from '@mui/material';

interface MovePokemonProps extends StackProps {
  pokemonList: NamedAPIResource[];
}

const MovePokemon = ({ pokemonList, ...rest }: MovePokemonProps): JSX.Element => {
  // memo
  const displayPokemon = useMemo(
    () => pokemonList.filter(({ url }) => getResourceId(url) <= 905),
    [pokemonList],
  );

  return (
    <Stack alignItems="flex-start" justifyContent="flex-start" gap={2} width="100%" {...rest}>
      <Typography variant="sectionTitle">{`Learnset (${displayPokemon?.length})`}</Typography>
      <InfiniteScroll pokemonList={displayPokemon} />
    </Stack>
  );
};

export default MovePokemon;
