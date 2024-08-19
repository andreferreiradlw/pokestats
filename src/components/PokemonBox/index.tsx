import { useMemo } from 'react';
// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
import { motion } from 'framer-motion';
// helpers
import { removeDash, mapGeneration, fadeInUpVariant, mapIdToGeneration } from '@/helpers';
// styles
import { PokeBox, NumberId, PokeName, PokeGen } from './StyledPokemonBox';
// components
import ImageNext from '@/components/ImageNext';
import Link from 'next/link';
import { CardProps } from '@mui/material';

export interface PokemonBoxProps extends CardProps {
  pokemonId: Pokemon['id'];
  pokemonName: Pokemon['name'];
  pokemonGen?: PokemonSpecies['generation']['name'];
  nameFormat?: boolean;
  defaultVarietyName?: string;
}

const PokemonBox = ({
  pokemonId,
  pokemonName,
  pokemonGen,
  nameFormat = true,
  defaultVarietyName,
  ...rest
}: PokemonBoxProps): JSX.Element => {
  const generationName = useMemo(() => mapGeneration(pokemonGen), [pokemonGen]);

  return (
    <Link
      href={`/pokemon/${defaultVarietyName || pokemonName.toLocaleLowerCase()}`}
      legacyBehavior
      passHref
      prefetch={false}
    >
      <motion.a
        whileHover="hover"
        whileTap="tap"
        variants={fadeInUpVariant}
        key={`pokemonbox-${pokemonId}`}
      >
        <PokeBox elevation={2} {...rest}>
          <ImageNext
            alt={pokemonName}
            key={`pokemonbox-img-${pokemonId}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
            width="100"
            height="100"
          />
          <NumberId>{`#${pokemonId}`}</NumberId>
          <PokeName>{nameFormat ? removeDash(pokemonName) : pokemonName}</PokeName>
          <PokeGen>{generationName || mapGeneration(mapIdToGeneration(pokemonId))}</PokeGen>
        </PokeBox>
      </motion.a>
    </Link>
  );
};

export default PokemonBox;
