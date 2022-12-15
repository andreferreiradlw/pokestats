import { forwardRef } from 'react';
import Link from 'next/link';
// types
import type { Pokemon } from '@/types';
import type { HTMLMotionProps } from 'framer-motion';
// helpers
import { removeDash } from '@/helpers/typography';
// styles
import { PokeBox, NumberId, PokeName } from '@/components/BaseStyles';
import Image from '@/components/Image';

interface PokemonBoxProps extends HTMLMotionProps<'div'> {
  pokemon: Pokemon;
  dark?: boolean;
}

const PokemonBox = forwardRef(
  ({ pokemon, dark, ...rest }: PokemonBoxProps, ref: React.Ref<HTMLDivElement>): JSX.Element => {
    // data from prop
    const { name, id } = pokemon;

    return (
      <Link href={`/pokemon/${name}`}>
        <PokeBox ref={ref} $dark={dark} {...rest}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            crossOrigin="anonymous"
            alt={name}
            key={`infinite-scroll-${name}-${id}`}
            pixelated
            width="115"
            height="115"
            offset={300}
          />
          <NumberId>{`#${id}`}</NumberId>
          <PokeName>{removeDash(name)}</PokeName>
        </PokeBox>
      </Link>
    );
  },
);

PokemonBox.displayName = 'PokemonBox';

export default PokemonBox;
