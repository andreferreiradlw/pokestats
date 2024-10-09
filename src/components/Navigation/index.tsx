'use client';

// types
import type { PokestatsPokemonPageProps } from '@/app/pokemon/[pokemonName]/page';
// helpers
import { useUmami } from '@/hooks';
// components
import NavigationButton from './NavigationButton';
import { Stack, type StackProps } from '@mui/material';

interface NavigationProps extends StackProps {
  speciesId: number;
  allPokemon: PokestatsPokemonPageProps['allPokemon'];
  prefix?: 'pokemon' | 'sprites';
}

const Navigation = ({
  allPokemon,
  speciesId,
  prefix = 'pokemon',
  ...rest
}: NavigationProps): JSX.Element => {
  // analytics
  const { track } = useUmami();

  const pokemonLength = allPokemon.length;

  const prevPokemon = speciesId > 1 ? allPokemon[speciesId - 2] : null;
  const nextPokemon = speciesId < pokemonLength ? allPokemon[speciesId] : null;

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
          pokemonId={speciesId}
          direction="left"
          handleClick={() => track('Previous Pokemon Navigation Click')}
        />
      )}
      {nextPokemon && (
        <NavigationButton
          prefix={prefix}
          pokemonName={nextPokemon.name}
          pokemonId={speciesId}
          direction="right"
          handleClick={() => track('Next Pokemon Navigation Click')}
        />
      )}
    </Stack>
  );
};

export default Navigation;
