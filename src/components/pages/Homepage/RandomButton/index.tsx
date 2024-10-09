'use client';

import { useMemo } from 'react';
// types
import type { NamedAPIResource } from 'pokenode-ts';
// helpers
import { useUmami } from '@/hooks';
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
  // hooks
  const router = useRouter();
  const { track } = useUmami();

  // Generate the random Pokémon URL
  const randomPokemonUrl = useMemo(
    () => (pokemonList ? `/pokemon/${pokemonList[getRandomInt(1, pokemonList.length)].name}` : ''),
    [pokemonList],
  );

  // Handle button click
  const handleClick = () => {
    track('Random Pokemon Button Click');
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
