// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { Pokemon } from 'pokenode-ts';
// helpers
import { removeDash } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
import Image from '@/components/Image';
// styles
import { BtnAnchor, Title, Arrow } from './StyledNavigation';

interface NavigationProps extends BoxProps {
  allPokemon: PokestatsPokemonPageProps['allPokemon'];
  pokemonId: Pokemon['id'];
}

const Navigation = ({ allPokemon, pokemonId, ...rest }: NavigationProps): JSX.Element => {
  // pokemon array length
  const pokemonLength = allPokemon.length;

  return (
    <Box
      direction={{ xxs: 'column', sm: 'row' }}
      justify={{ xxs: 'flex-start', sm: 'center' }}
      gap="0.5em"
      {...rest}
    >
      {pokemonId !== 1 && (
        <BtnAnchor href={`/pokemon/${allPokemon[pokemonId - 2].name}`} $left>
          <Arrow $left>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemonId - 1
              }.png`}
              alt={allPokemon[pokemonId - 2].name}
              key={`navigation-left-${allPokemon[pokemonId - 2].name}`}
              width="100"
              pixelateImg
              lazy={false}
            />
          </Arrow>
          <Title>
            <span>{`#${pokemonId - 1}`}</span>
            {removeDash(allPokemon[pokemonId - 2].name)}
          </Title>
        </BtnAnchor>
      )}
      {pokemonId !== pokemonLength && (
        <BtnAnchor href={`/pokemon/${allPokemon[pokemonId].name}`} $right>
          <Arrow $right>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemonId + 1
              }.png`}
              alt={allPokemon[pokemonId].name}
              key={`navigation-right-${allPokemon[pokemonId].name}`}
              width="100"
              pixelateImg
              lazy={false}
            />
          </Arrow>
          <Title>
            <span>{`#${pokemonId + 1}`}</span>
            {removeDash(allPokemon[pokemonId].name)}
          </Title>
        </BtnAnchor>
      )}
    </Box>
  );
};

export default Navigation;