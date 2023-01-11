// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { Pokemon } from 'pokenode-ts';
// helpers
import { removeDash, fadeInUpVariant } from '@/helpers';
// components
import Box, { BoxProps } from '@/components/Box';
import Image from '@/components/Image';
// styles
import { BtnContainer, BtnAnchor, Title, Arrow } from './StyledNavigation';

const nextPokemon = () => {
  // if (process.env.NODE_ENV === 'production' && window?.waa) window.waa.dispatch('Next Pokemon');
};

const previousPokemon = () => {
  // if (process.env.NODE_ENV === 'production' && window?.waa) window.waa.dispatch('Previous Pokemon');
};

interface NavigationProps extends BoxProps {
  allPokemon: PokestatsPokemonPageProps['allPokemon'];
  pokemonId: Pokemon['id'];
}

const Navigation = ({ allPokemon, pokemonId, ...rest }: NavigationProps): JSX.Element => {
  // pokemon array length
  const pokemonLength = allPokemon.length;

  return (
    <Box
      flexdirection={{ xxs: 'column', sm: 'row' }}
      flexjustify={{ xxs: 'flex-start', sm: 'center' }}
      flexgap="1em"
      {...rest}
    >
      {pokemonId !== 1 && (
        <BtnContainer
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key={`previous-pokemon-${allPokemon[pokemonId - 2].name}`}
        >
          <BtnAnchor
            href={`/pokemon/${allPokemon[pokemonId - 2].name}`}
            onClick={previousPokemon}
            $left
          >
            <Arrow $left>
              <Image
                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${(
                  pokemonId - 1
                )
                  .toString()
                  .padStart(3, '0')}.png`}
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
        </BtnContainer>
      )}
      {pokemonId !== pokemonLength && (
        <BtnContainer
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key={`previous-pokemon-${allPokemon[pokemonId].name}`}
        >
          <BtnAnchor href={`/pokemon/${allPokemon[pokemonId].name}`} onClick={nextPokemon} $right>
            <Arrow $right>
              <Image
                src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${(
                  pokemonId + 1
                )
                  .toString()
                  .padStart(3, '0')}.png`}
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
        </BtnContainer>
      )}
    </Box>
  );
};

export default Navigation;
