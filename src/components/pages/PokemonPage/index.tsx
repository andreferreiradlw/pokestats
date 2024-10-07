// types
import type { PokestatsPokemonPageProps } from '@/app/pokemon/[pokemonName]/page';
// components
import { Divider, Grid2, Stack } from '@mui/material';
import Details from './Details';
import FeaturedImage from './FeatureImage';
import EvolutionChain from './EvolutionChain';
import Breeding from './Breeding';
import Training from './Training';
import Multipliers from './Multipliers';
import BaseStats from './BaseStats';
import PokemonForms from './Forms';
import Moves from './Moves';
import Sprites from './Sprites';
import Navigation from '@/components/Navigation';
import Encounters from './Encounters';

const PokemonPage = ({
  allPokemon,
  pokemon,
  abilities,
  species,
  evolutionData,
}: PokestatsPokemonPageProps): JSX.Element => {
  // data
  const { stats, types, sprites } = pokemon;

  return (
    <Stack divider={<Divider />} gap={4}>
      <Grid2
        container
        direction={{ xxs: 'column-reverse', lg: 'row' }}
        alignItems="stretch"
        justifyContent="flex-start"
        spacing={4}
        size={12}
      >
        <Details
          size={{ xxs: 12, lg: 5 }}
          pokemon={pokemon}
          abilities={abilities}
          species={species}
        />
        <FeaturedImage size={{ xxs: 12, lg: 7 }} species={species} sprites={sprites} />
      </Grid2>
      {/** BREEDING, TRAINING, MULTIPLIERS */}
      <Grid2
        container
        direction={{ xxs: 'column', md: 'row' }}
        alignItems="stretch"
        justifyContent="space-between"
        spacing={4}
        size={12}
        wrap="wrap"
      >
        <Breeding
          species={species}
          babyTriggerItem={evolutionData.baby_trigger_item}
          size={{ xxs: 12, md: 6, lg: 4 }}
        />
        <Training pokemon={pokemon} species={species} size={{ xxs: 12, md: 6, lg: 4 }} />
        <Multipliers pokemonTypes={types} size={{ xxs: 12, md: 6, lg: 4 }} />
        <PokemonForms pokemon={pokemon} species={species} size={{ xxs: 12, md: 6, lg: 4 }} />
        <BaseStats stats={stats} size={{ xxs: 12, lg: 8 }} />
      </Grid2>
      {/** ENCOUNTERS */}
      <Stack alignItems="flex-start" justifyContent="flex-start">
        <Encounters species={species} />
      </Stack>
      {/** EVOLUTION CHAIN */}
      <Stack alignItems="flex-start" justifyContent="flex-start">
        <EvolutionChain evolutionChain={evolutionData} pokemonSpecies={species} />
      </Stack>
      {/** MOVES */}
      <Stack alignItems="flex-start" justifyContent="flex-start">
        <Moves pokemon={pokemon} />
      </Stack>
      {/** SPRITES & NAVIGATION */}
      <Sprites pokemon={pokemon} />
      <Navigation allPokemon={allPokemon} pokemonSpecies={species} />
    </Stack>
  );
};

export default PokemonPage;
