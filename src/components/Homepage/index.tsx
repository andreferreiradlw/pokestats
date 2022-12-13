import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
// heplpers
import { staggerInitialVariant, fadeInUpVariant } from '../../helpers';
// types
import type { Pokemon, PokemonType } from '@/types';
// components
import Autocomplete from '@/components/Autocomplete';
import { Button } from '@/components/BaseStyles/button';
import Particles from '@/components/Particles';
import PokemonList from './PokemonList';
// styles
import { Container, RepoAnchor, ScrollDown } from './styledHomepage';
import { MainHeading } from '../BaseStyles';
// svg
import Github from '../../assets/svg/github.svg';

interface HomepageProps {
  allPokemon: Pokemon[];
  pokemonTypes: PokemonType[];
}

const Homepage = ({ allPokemon, pokemonTypes }: HomepageProps): JSX.Element => {
  // router
  const router = useRouter();

  const routeRandom = () =>
    router.push(`/pokemon/${allPokemon[Math.floor(Math.random() * allPokemon.length)].name}`);

  return (
    <AnimatePresence mode="wait">
      <RepoAnchor
        href="https://github.com/andreferreiradlw/pokestats"
        target="_blank"
        rel="noopener"
        initial="hidden"
        animate="show"
        whileHover="hover"
        whileTap="tap"
        variants={fadeInUpVariant}
        key="homepage-github"
      >
        <Github />
      </RepoAnchor>
      <Container
        height="100vh"
        $constrained
        $withGutter
        initial="hidden"
        animate="show"
        variants={staggerInitialVariant}
        key="homepage-container"
      >
        <MainHeading variants={fadeInUpVariant} key="homepage-heading">
          PokeStats
        </MainHeading>
        <Autocomplete
          filterList={[...allPokemon, ...pokemonTypes]}
          variants={fadeInUpVariant}
          key="homepage-autocomplete"
        />
        <Button onClick={routeRandom} $dark variants={fadeInUpVariant} key="homepage-random-btn">
          Random Pokemon!
        </Button>
        <ScrollDown variants={fadeInUpVariant} key="homepage-scroll-down" />
      </Container>
      {/* <PokemonList /> */}
      <Particles />
    </AnimatePresence>
  );
};

export default Homepage;
