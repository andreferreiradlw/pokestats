// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { Pokemon } from 'pokenode-ts';
// helpers
import { usePlausible } from 'next-plausible';
// components
import NavigationButton from './NavigationButton';
import { Stack, StackProps } from '@mui/material';

interface NavigationProps extends StackProps {
  allPokemon: PokestatsPokemonPageProps['allPokemon'];
  pokemonId: Pokemon['id'];
}

const Navigation = ({ allPokemon, pokemonId, ...rest }: NavigationProps): JSX.Element => {
  const plausible = usePlausible();
  const pokemonLength = allPokemon.length;

  const prevPokemon = pokemonId > 1 ? allPokemon[pokemonId - 2] : null;
  const nextPokemon = pokemonId < pokemonLength ? allPokemon[pokemonId] : null;

  return (
    <Stack
      flexDirection={{ xxs: 'column', sm: 'row' }}
      alignItems="center"
      justifyContent={{ xxs: 'flex-start', sm: 'center' }}
      gap="1em"
      width="100%"
      {...rest}
    >
      {prevPokemon && (
        <NavigationButton
          pokemonName={prevPokemon.name}
          pokemonId={pokemonId}
          direction="left"
          handleClick={() => plausible('Previous Pokemon')}
        />
      )}
      {nextPokemon && (
        <NavigationButton
          pokemonName={nextPokemon.name}
          pokemonId={pokemonId}
          direction="right"
          handleClick={() => plausible('Next Pokemon')}
        />
      )}
    </Stack>
  );
};

export default Navigation;
