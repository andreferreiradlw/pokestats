import { useMemo } from 'react';
// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
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
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Typography, type CardProps } from '@mui/material';
import ImageNextV2 from '../ImageNextV2';

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
  // memo
  const generationName = useMemo(
    () => pokemonGen && mapGeneration(pokemonGen as GameGenValue),
    [pokemonGen],
  );

  const imageUrl = useMemo(
    () =>
      pokemonId > 905
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
        : `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(
            pokemonId,
          )}.png`,
    [pokemonId],
  );

  return (
    <Link
      href={`/pokemon/${defaultVarietyName || pokemonName.toLocaleLowerCase()}`}
      legacyBehavior
      passHref
      prefetch={false}
    >
      <motion.a
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={hoverVariant}
        key={`pokemonbox-${pokemonId}`}
      >
        <PokeBox elevation={2} {...rest}>
          <ImageNextV2
            alt={pokemonName}
            customKey={`pokemonbox-img-${pokemonId}`}
            imageUrl={imageUrl}
            width="100px"
            height="100px"
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
