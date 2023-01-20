import { useEffect, useContext } from 'react';
// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
// helpers
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { mapGenerationToGame, pageContainerVariant, findPokemonName } from '@/helpers';
// styles
import { Divider } from '@/components/BaseStyles';
// components
import { AnimatePresence } from 'framer-motion';
import { MainContainer } from '@/components/Layout';
import Box from '@/components/Box';
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

const PokemonPage = ({
  allPokemon,
  pokemon,
  abilities,
  species,
  evolutionChain,
}: Omit<PokestatsPokemonPageProps, 'allPokemonTypes' | 'pokemonGen'>): JSX.Element => {
  // game version
  const { setGameVersion } = useContext(GameVersionContext);
  // data
  const { id, name, stats, types, sprites, game_indices } = pokemon;
  const { names, generation, varieties } = species;
  const { babyTriggerItem } = evolutionChain;

  const currPokemonName = findPokemonName(species);

  useEffect(() => {
    let pokemonGen: string;
    // set current pokemon gen
    game_indices?.[0]
      ? (pokemonGen = game_indices[0].version.name)
      : (pokemonGen = mapGenerationToGame(generation.name));

    setGameVersion(pokemonGen);
  }, [generation, game_indices, setGameVersion]);

  return (
    <AnimatePresence mode="wait">
      <MainContainer
        constrained
        $withGutter
        initial="hidden"
        animate="visible"
        exit="fade"
        variants={pageContainerVariant}
        key={`pokemon-${name}`}
      >
        <Divider />
        <Box
          flexdirection={{ xxs: 'column-reverse', lg: 'row' }}
          flexalign="center"
          flexjustify="flex-start"
          flexgap="2em"
        >
          <Details
            screensizes={{ xxs: 12, lg: 5 }}
            key={`pokemon-details-${name}`}
            pokemon={pokemon}
            abilities={abilities}
            species={species}
            // $emphasizedBg={mainType}
          />
          <FeaturedImage
            screensizes={{ xxs: 12, lg: 7 }}
            specieNames={names}
            pokemonName={currPokemonName}
            pokemonId={id}
          />
        </Box>
        <Divider />
        {/** BREEDING, TRAINING, MULTIPLIERS */}
        <Box
          flexdirection={{ xxs: 'column', lg: 'row' }}
          flexalign="stretch"
          flexjustify="space-between"
          flexgap="2em"
        >
          <Breeding species={species} babyTriggerItem={babyTriggerItem} />
          <Training pokemon={pokemon} species={species} />
          <Multipliers pokemonTypes={types} />
        </Box>
        {/** BASESTATS, FORMS */}
        <Box
          flexdirection={{ xxs: 'column', lg: 'row' }}
          flexalign="stretch"
          flexjustify="space-between"
          flexgap="2em"
        >
          <BaseStats stats={stats} screensizes={{ xxs: 12, lg: 8 }} />
          <PokemonForms
            pokemonId={id}
            pokemonName={currPokemonName}
            species={species}
            screensizes={{ xxs: 12, lg: 4 }}
          />
        </Box>
        <Divider />
        {/** EVOLUTION CHAIN */}
        <Box flexalign="flex-start" flexjustify="flex-start">
          <EvolutionChain
            screensizes={12}
            key={`pokemon-evolution-${name}`}
            pokemonName={currPokemonName}
            evolutionChain={evolutionChain}
          />
        </Box>
        <Divider />
        {/** MOVES */}
        <Box flexalign="flex-start" flexjustify="flex-start">
          <Moves pokemon={pokemon} screensizes={12} />
        </Box>
        <Divider />
        {/** SPRITES */}
        <Box flexalign="flex-start" flexjustify="flex-start">
          <Sprites pokemonSprites={sprites} pokemonId={id} forms={varieties} screensizes={12} />
        </Box>
        {/** NAVIGATION */}
        <Box flexalign="flex-start" flexjustify="flex-start">
          <Navigation allPokemon={allPokemon} pokemonId={id} screensizes={12} />
        </Box>
        <Divider />
      </MainContainer>
    </AnimatePresence>
  );
};

export default PokemonPage;
