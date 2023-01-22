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
        $contained
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
          flexdirection={{ xxs: 'column', md: 'row' }}
          flexalign="stretch"
          flexjustify="space-between"
          flexgap="2em"
          flexwrap="wrap"
        >
          <Breeding
            species={species}
            babyTriggerItem={babyTriggerItem}
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
            pokemonName={currPokemonName}
            species={species}
            screensizes={{ xxs: 12, md: 6, lg: 4 }}
            $parentGap="2em"
          />
          <BaseStats stats={stats} screensizes={{ xxs: 12, lg: 8 }} />
        </Box>
        <Divider />
        {/** EVOLUTION CHAIN */}
        <Box flexalign="flex-start" flexjustify="flex-start">
          <EvolutionChain
            key={`pokemon-evolution-${name}`}
            pokemonName={currPokemonName}
            evolutionChain={evolutionChain}
          />
        </Box>
        <Divider />
        {/** MOVES */}
        <Box flexalign="flex-start" flexjustify="flex-start">
          <Moves pokemon={pokemon} />
        </Box>
        <Divider />
        {/** SPRITES */}
        <Box flexalign="flex-start" flexjustify="flex-start">
          <Sprites pokemonSprites={sprites} pokemonId={id} forms={varieties} />
        </Box>
        {/** NAVIGATION */}
        <Box flexalign="flex-start" flexjustify="flex-start">
          <Navigation allPokemon={allPokemon} pokemonId={id} />
        </Box>
        <Divider />
      </MainContainer>
    </AnimatePresence>
  );
};

export default PokemonPage;
