import { useMemo, forwardRef, Ref } from 'react';
// types
import type { Pokemon, PokemonSpecies } from 'pokenode-ts';
import type { HTMLMotionProps } from 'framer-motion';
// helpers
import { removeDash, mapGeneration, fadeInUpVariant, padPokemonId } from '@/helpers';
// styles
import { PokeBox, NumberId, PokeName, PokeGen } from './StyledPokemonBox';
// components
import Link from 'next/link';
import ImageNext from '@/components/ImageNext';

export interface PokemonBoxProps extends HTMLMotionProps<'div'> {
  pokemonId: Pokemon['id'];
  pokemonName: Pokemon['name'];
  pokemonGen?: PokemonSpecies['generation']['name'];
  $dark?: boolean;
}

const PokemonBox = forwardRef(
  (
    { pokemonId, pokemonName, pokemonGen, $dark, ...rest }: PokemonBoxProps,
    ref: Ref<HTMLDivElement>,
  ): JSX.Element => {
    const generationName = useMemo(() => mapGeneration(pokemonGen), [pokemonGen]);

    return (
      <Link href={`/pokemon/${pokemonName}`}>
        <PokeBox
          ref={ref}
          $dark={$dark}
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key={`pokemonbox-${pokemonId}`}
          {...rest}
        >
          <ImageNext
            alt={pokemonName}
            key={`pokemonbox-img-${pokemonId}`}
            src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${padPokemonId(
              pokemonId,
            )}.png`}
            width="100"
            height="100"
          />
          <NumberId>{`#${pokemonId}`}</NumberId>
          <PokeName>{removeDash(pokemonName)}</PokeName>
          {generationName && <PokeGen>{generationName}</PokeGen>}
        </PokeBox>
      </Link>
    );
  },
);

export default PokemonBox;
