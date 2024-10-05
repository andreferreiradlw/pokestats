// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
import type { PokemonSpecies } from 'pokenode-ts';
// helpers
import { usePlausible } from 'next-plausible';
// components
import NavigationButton from './NavigationButton';
import type { StackProps } from '@mui/material';
import { Stack } from '@mui/material';

interface NavigationProps extends StackProps {
  pokemonSpecies: PokemonSpecies;
  allPokemon: PokestatsPokemonPageProps['allPokemon'];
  prefix?: 'pokemon' | 'sprites';
}

const Navigation = ({
  allPokemon,
  pokemonSpecies,
  prefix = 'pokemon',
  ...rest
}: NavigationProps): JSX.Element => {
  // analytics
  const plausible = usePlausible();

  // data
  const { id } = pokemonSpecies;

  const pokemonLength = allPokemon.length;

  const prevPokemon = id > 1 ? allPokemon[id - 2] : null;
  const nextPokemon = id < pokemonLength ? allPokemon[id] : null;

  return (
    <Stack
      flexDirection={{ xxs: 'column', sm: 'row' }}
      alignItems="center"
      justifyContent={{ xxs: 'flex-start', sm: 'center' }}
      gap={2}
      width="100%"
      {...rest}
    >
      {prevPokemon && (
        <NavigationButton
          prefix={prefix}
          pokemonName={prevPokemon.name}
          pokemonId={id}
          direction="left"
          handleClick={() => plausible('Previous Pokemon')}
        />
      )}
      {nextPokemon && (
        <NavigationButton
          prefix={prefix}
          pokemonName={nextPokemon.name}
          pokemonId={id}
          direction="right"
          handleClick={() => plausible('Next Pokemon')}
        />
      )}
    </Stack>
  );
};

export default Navigation;
