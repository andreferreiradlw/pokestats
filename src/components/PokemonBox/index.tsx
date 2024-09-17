import { useMemo } from 'react';
// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
import { motion } from 'framer-motion';
// helpers
import {
  removeDash,
  mapGeneration,
  mapIdToGeneration,
  type GameGenValue,
  formatPokemonId,
} from '@/helpers';
import { hoverVariant } from '@/animations';
// styles
import { PokeBox } from './StyledPokemonBox';
// components
import ImageNext from '@/components/ImageNext';
import Link from 'next/link';
import type { CardProps } from '@mui/material';
import { Typography } from '@mui/material';

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
  const generationName = useMemo(
    () => pokemonGen && mapGeneration(pokemonGen as GameGenValue),
    [pokemonGen],
  );

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
        variants={hoverVariant}
        key={`pokemonbox-${pokemonId}`}
      >
        <PokeBox elevation={2} {...rest}>
          <ImageNext
            alt={pokemonName}
            key={`pokemonbox-img-${pokemonId}`}
            src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(
              pokemonId,
            )}.png`}
            width="100"
            height="100"
          />
          <Typography variant="h3" component="span">{`#${pokemonId}`}</Typography>
          <Typography variant="h5" component="span" textTransform="capitalize">
            {nameFormat ? removeDash(pokemonName) : pokemonName}
          </Typography>
          <Typography>
            {generationName || mapGeneration(mapIdToGeneration(pokemonId) as GameGenValue)}
          </Typography>
        </PokeBox>
      </motion.a>
    </Link>
  );
};

export default PokemonBox;
