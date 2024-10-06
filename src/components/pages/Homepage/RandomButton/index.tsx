'use client';

import { useMemo } from 'react';
// types
import type { NamedAPIResource } from 'pokenode-ts';
// helpers
import { usePlausible } from 'next-plausible';
import { getRandomInt } from '@/helpers';
import { useRouter } from 'next/navigation';
// components
import CustomButton from '@/components/CustomButton';
// styles
import { Pokeball } from './styledRandomButton';

interface RandomButtonProps {
  pokemonList: NamedAPIResource[];
}

const RandomButton = ({ pokemonList }: RandomButtonProps): JSX.Element => {
  const router = useRouter();
  const plausible = usePlausible();

  // Generate the random Pokémon URL
  const randomPokemonUrl = useMemo(
    () => (pokemonList ? `/pokemon/${pokemonList[getRandomInt(1, pokemonList.length)].name}` : ''),
    [pokemonList],
  );

  // Handle button click
  const handleClick = () => {
    plausible('Random Pokemon');
    router.push(randomPokemonUrl);
  };

  return (
    <CustomButton
      onClick={handleClick}
      variant="contained"
      color="secondary"
      size="large"
      endIcon={<Pokeball />}
    >
      Random Pokémon
    </CustomButton>
  );
};

export default RandomButton;
