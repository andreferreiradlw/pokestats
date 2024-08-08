import { useMemo } from 'react';
// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
import type { HTMLMotionProps } from 'framer-motion';
// helpers
import { removeDash, mapGeneration, fadeInUpVariant, prefixId, mapIdToGeneration } from '@/helpers';
// styles
import { PokeBox, NumberId, PokeName, PokeGen } from './StyledPokemonBox';
// components
import ImageNext from '@/components/ImageNext';
import Link from 'next/link';

export interface PokemonBoxProps extends HTMLMotionProps<'a'> {
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
    >
      <PokeBox
        whileHover="hover"
        whileTap="tap"
        variants={fadeInUpVariant}
        key={`pokemonbox-${pokemonId}`}
        {...rest}
      >
        <ImageNext
          alt={pokemonName}
          key={`pokemonbox-img-${pokemonId}`}
          src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${prefixId(
            pokemonId,
          )}.png`}
          width="100"
          height="100"
        />
        <NumberId>{`#${pokemonId}`}</NumberId>
        <PokeName>{nameFormat ? removeDash(pokemonName) : pokemonName}</PokeName>
        <PokeGen>{generationName || mapGeneration(mapIdToGeneration(pokemonId))}</PokeGen>
      </PokeBox>
    </Link>
  );
};

export default PokemonBox;
