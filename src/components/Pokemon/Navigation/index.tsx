// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { Pokemon } from 'pokenode-ts';
// helpers
import { usePlausible } from 'next-plausible';
import { removeDash, fadeInUpVariant, prefixId } from '@/helpers';
// styles
import { BtnContainer, BtnAnchor, Title, Arrow, PokemonID, PokemonName } from './StyledNavigation';
// components
import Box, { BoxProps } from '@/components/Box';
import ImageNext from '@/components/ImageNext';

interface NavigationProps extends BoxProps {
  allPokemon: PokestatsPokemonPageProps['allPokemon'];
  pokemonId: Pokemon['id'];
}

const Navigation = ({ allPokemon, pokemonId, ...rest }: NavigationProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();
  // pokemon array length
  const pokemonLength = allPokemon.length;

  return (
    <Box
      flexdirection={{ xxs: 'column', sm: 'row' }}
      flexjustify={{ xxs: 'flex-start', sm: 'center' }}
      flexgap="1em"
      flexmargin="1em 0 0"
      {...rest}
    >
      {pokemonId !== 1 && (
        <BtnContainer
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key={`previous-pokemon-${allPokemon[pokemonId - 2]?.name}`}
        >
          <BtnAnchor
            href={`/pokemon/${allPokemon[pokemonId - 2]?.name}`}
            onClick={() => plausible('Previous Pokemon')}
            $left
          >
            <Arrow $left>
              <ImageNext
                src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${prefixId(
                  pokemonId - 1,
                )}.png`}
                alt={allPokemon[pokemonId - 2]?.name}
                key={`navigation-left-${allPokemon[pokemonId - 2]?.name}`}
                width="100"
              />
            </Arrow>
            <Title>
              <PokemonID>{`#${pokemonId - 1}`}</PokemonID>
              <PokemonName>{removeDash(allPokemon[pokemonId - 2]?.name)}</PokemonName>
            </Title>
          </BtnAnchor>
        </BtnContainer>
      )}
      {pokemonId !== pokemonLength && (
        <BtnContainer
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key={`previous-pokemon-${allPokemon[pokemonId]?.name}`}
        >
          <BtnAnchor
            href={`/pokemon/${allPokemon[pokemonId]?.name}`}
            onClick={() => plausible('Next Pokemon')}
            $right
          >
            <Arrow $right>
              <ImageNext
                src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${prefixId(
                  pokemonId + 1,
                )}.png`}
                alt={allPokemon[pokemonId]?.name}
                key={`navigation-right-${allPokemon[pokemonId]?.name}`}
                width="100"
              />
            </Arrow>
            <Title>
              <PokemonID>{`#${pokemonId + 1}`}</PokemonID>
              <PokemonName>{removeDash(allPokemon[pokemonId]?.name)}</PokemonName>
            </Title>
          </BtnAnchor>
        </BtnContainer>
      )}
    </Box>
  );
};

export default Navigation;
