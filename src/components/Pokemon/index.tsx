import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import LazyLoad from 'react-lazyload';
import { AnimatePresence } from 'framer-motion';
// types
import type { PokestatsPokemonPageProps } from '@/pages/pokemon/[pokemonId]';
// import type { Pokemon, PokemonType } from '@/types';
// import type { Pokemon } from 'pokenode-ts';
// actions
import { fetchPokemonData, cleanData } from './pokemonSlice';
import { changeVersion } from '../Header/gameSlice';
// helpers
import { mapGenerationToGame } from '../../helpers/gameVersion';
import { removeDash } from '../../helpers/typography';
import { pageContainerVariant } from '../../helpers/animations';
// components
import Layout, { MainContainer } from '../Layout';
import Loading from '../Loading';
import Box from '../Box';
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
  allPokemonTypes,
  pokemon,
  species,
  evolution,
}: PokestatsPokemonPageProps): JSX.Element => {
  // console.log('allPokemon', allPokemon);
  // console.log('allPokemonTypes', allPokemonTypes);
  // console.log('pokemon', pokemon);
  // console.log('species', species);
  // console.log('evolution', evolution);

  const { id, game_indices, name, stats, types } = pokemon;
  const { generation, names } = species;
  // router
  // const router = useRouter();
  // dispatch
  // const dispatch = useDispatch();
  // pokemon selector
  // const pokemonInfo = useSelector(state => state.pokemon.info);
  // biology
  // const pokemonBio = useSelector(state => state.pokemon.biology);
  // game version
  // const gameVersion = useSelector(state => state.game.version);
  // data
  // const { id, game_indices, name } = pokemonInfo.data;
  // const { generation, names } = pokemonBio.data;

  // useEffect(() => {
  //   // reset data on unmount
  //   return () => {
  //     dispatch(cleanData());
  //   };
  // }, []);

  // fetch pokemon data
  // useEffect(() => {
  //   if (pokemonName) {
  //     // check if previous pokemon data exists
  //     if (Object.keys(pokemonInfo.data).length !== 0) {
  //       // reset data
  //       dispatch(cleanData());
  //     }
  //     // fetch new pokemon data
  //     dispatch(fetchPokemonData(pokemonName));
  //   }
  // }, [pokemonName]);

  // update game version for current Pokemon
  // useEffect(() => {
  //   if (game_indices?.[0]) {
  //     // change to first game indice
  //     if (gameVersion !== game_indices[0].version.name)
  //       dispatch(changeVersion(game_indices[0].version.name));
  //   } else if (generation) {
  //     // if no game indice avaliable change to generation
  //     let gameGen = mapGenerationToGame(generation.name);
  //     if (gameVersion !== gameGen) dispatch(changeVersion(gameGen));
  //   }
  // }, [generation]);

  // error handling
  // useEffect(() => {
  //   if (pokemonInfo.error.status !== 'OK' || id > 809) {
  //     router.push('/404', router.asPath);
  //   }
  // }, [pokemonInfo]);

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
          {/* <LazyLoad once offset={600}>
                <Moves sizes={12} margin="0 0 2rem" />
              </LazyLoad> */}
        </Box>
        {/** SPRITES */}
        <Box align="flex-start" justify="flex-start" margin="1rem 0">
          {/* <LazyLoad height={800} once offset={350}>
                <Sprites sizes={12} margin="0 0 2rem" />
              </LazyLoad> */}
        </Box>
        {/** NAVIGATION */}
        <Box align="flex-start" justify="flex-start" margin="1rem 0">
          {/* <Navigation sizes={12} margin="0 0 2rem" /> */}
        </Box>
      </MainContainer>
    </AnimatePresence>
  );
};

export default PokemonPage;
