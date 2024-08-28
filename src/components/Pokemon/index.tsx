// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
// components
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
import Navigation from './Navigation';
import { Divider, Stack } from '@mui/material';

const PokemonPage = ({
  allPokemon,
  pokemon,
  abilities,
  species,
  evolutionData,
}: Omit<PokestatsPokemonPageProps, 'autocompleteList' | 'pokemonGen'>): JSX.Element => {
  // data
  const { id, name, stats, types, sprites } = pokemon;
  const { names, varieties } = species;

  return (
    <Stack divider={<Divider />} gap={4} py={2}>
      <Stack
        direction={{ xxs: 'column-reverse', lg: 'row' }}
        alignItems="center"
        justifyContent="flex-start"
        gap="2em"
      >
        <Details
          screensizes={{ xxs: 12, lg: 5 }}
          key={`pokemon-details-${name}`}
          pokemon={pokemon}
          abilities={abilities}
          species={species}
        />
        <FeaturedImage screensizes={{ xxs: 12, lg: 7 }} specieNames={names} pokemonId={id} />
      </Stack>
      {/** BREEDING, TRAINING, MULTIPLIERS */}
      <Stack
        direction={{ xxs: 'column', md: 'row' }}
        alignItems="stretch"
        justifyContent="space-between"
        gap="2em"
        flexWrap="wrap"
      >
        <Breeding
          species={species}
          babyTriggerItem={evolutionData.baby_trigger_item}
          screensizes={{ xxs: 12, md: 6, lg: 4 }}
          $parentGap="2em"
        />
        <Training
          pokemon={pokemon}
          species={species}
          screensizes={{ xxs: 12, md: 6, lg: 4 }}
          $parentGap="2em"
        />
        <Multipliers
          pokemonTypes={types}
          screensizes={{ xxs: 12, md: 6, lg: 4 }}
          $parentGap="2em"
        />
        <PokemonForms
          pokemonId={id}
          species={species}
          screensizes={{ xxs: 12, md: 6, lg: 4 }}
          $parentGap="2em"
        />
        <BaseStats stats={stats} screensizes={{ xxs: 12, lg: 8 }} />
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
      <Stack alignItems="flex-start" justifyContent="flex-start" gap={2}>
        <Sprites pokemonSprites={sprites} pokemonId={id} forms={varieties} />
        <Navigation allPokemon={allPokemon} pokemonId={id} />
      </Stack>
    </Stack>
  );
};

export default PokemonPage;
