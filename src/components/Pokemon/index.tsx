import { useEffect, useContext } from 'react';
// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
// helpers
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { mapGenerationToGame, pageContainerVariant } from '@/helpers';
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
  species,
  evolution,
  pokemonMoves,
}: Omit<PokestatsPokemonPageProps, 'allPokemonTypes'>): JSX.Element => {
  // game version
  const { gameVersion, setGameVersion } = useContext(GameVersionContext);
  // data
  const { id, name, stats, types, sprites, game_indices } = pokemon;
  const { names, generation } = species;

  useEffect(() => {
    let pokemonGen: string;
    // set current pokemon gen
    game_indices?.[0]
      ? (pokemonGen = game_indices[0].version.name)
      : (pokemonGen = mapGenerationToGame(generation.name));

    setGameVersion(pokemonGen);
  }, [generation, game_indices, gameVersion, setGameVersion]);

  return (
    <AnimatePresence mode="wait">
      <MainContainer
        $constrained
        $withGutter
        initial="hidden"
        animate="visible"
        exit="fade"
        variants={pageContainerVariant}
        key={`pokemon-${name}`}
      >
        <Box
          direction={{ xxs: 'column-reverse', lg: 'row' }}
          align="center"
          justify="flex-start"
          margin="1rem 0"
          $minHeight="533px"
        >
          <Details
            sizes={5}
            margin={{ xxs: '0 0 2rem', lg: '0' }}
            key={`pokemon-details-${name}`}
            pokemon={pokemon}
            species={species}
          />
          <FeaturedImage
            sizes={7}
            margin={{ xxs: '0 0 2rem', lg: '0' }}
            specieNames={names}
            pokemonName={name}
            pokemonId={id}
          />
        </Box>
        {/** EVOLUTION CHAIN */}
        <Box align="flex-start" justify="flex-start" margin="1rem 0" $minHeight="375px">
          <EvolutionChain
            sizes={12}
            margin="0 0 2rem"
            key={`pokemon-evolution-${name}`}
            evolutionChain={evolution}
          />
        </Box>
        {/** BREEDING, TRAINING, MULTIPLIERS */}
        <Box
          direction={{ xxs: 'column', lg: 'row' }}
          align="flex-start"
          justify="flex-start"
          margin="1rem 0"
          $minHeight="347px"
        >
          <Breeding
            species={species}
            evolutionChain={evolution}
            margin={{ xxs: '0 0 2rem', lg: '0' }}
            padding={{ xxs: '0', lg: '0 2rem 0 0' }}
          />
          <Training
            pokemon={pokemon}
            species={species}
            margin={{ xxs: '0 0 2rem', lg: '0' }}
            padding={{ xxs: '0', lg: '0 1rem' }}
          />
          <Multipliers
            pokemonTypes={types}
            margin={{ xxs: '0 0 2rem', lg: '0' }}
            padding={{ xxs: '0', lg: '0 0 0 2rem' }}
          />
        </Box>
        {/** BASESTATS, FORMS */}
        <Box
          direction={{ xxs: 'column', lg: 'row' }}
          align="flex-start"
          justify="flex-start"
          margin="1rem 0"
        >
          <BaseStats
            stats={stats}
            sizes={{ xxs: 12, lg: 8 }}
            margin={{ xxs: '0 0 2rem', lg: '0' }}
            padding={{ xxs: '0', lg: '0 2rem 0 0' }}
          />
          <PokemonForms species={species} sizes={{ xxs: 12, lg: 4 }} />
        </Box>
        {/** MOVES */}
        <Box align="flex-start" justify="flex-start" margin="1rem 0" $minHeight="210px">
          <Moves pokemonMoves={pokemonMoves} sizes={12} margin="0 0 2rem" />
        </Box>
        {/** SPRITES */}
        <Box align="flex-start" justify="flex-start" margin="1rem 0">
          <Sprites pokemonSprites={sprites} pokemonId={id} sizes={12} margin="0 0 2rem" />
        </Box>
        {/** NAVIGATION */}
        <Box align="flex-start" justify="flex-start" margin="1rem 0">
          <Navigation allPokemon={allPokemon} pokemonId={id} sizes={12} margin="0 0 2rem" />
        </Box>
      </MainContainer>
    </AnimatePresence>
  );
};

export default PokemonPage;
