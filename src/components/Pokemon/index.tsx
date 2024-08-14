// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
// helpers
import { pageContainerVariant, findEnglishName } from '@/helpers';
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
  evolutionData,
}: Omit<PokestatsPokemonPageProps, 'autocompleteList' | 'pokemonGen'>): JSX.Element => {
  // data
  const { id, name, stats, types, sprites } = pokemon;
  const { names, varieties } = species;

  const currPokemonName = findEnglishName(names);

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
          <EvolutionChain item evolutionChain={evolutionData} pokemonSpecies={species} />
        </Box>
        <Divider />
        {/** MOVES */}
        <Box flexalign="flex-start" flexjustify="flex-start">
          <Moves pokemon={pokemon} species={species} />
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
