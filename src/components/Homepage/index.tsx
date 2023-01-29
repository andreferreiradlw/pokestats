import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
// heplpers
import { usePlausible } from 'next-plausible';
import { staggerInitialVariant, fadeInUpVariant, getRandomInt } from '@/helpers';
// types
import type { PokestatsHomepageProps } from '@/pages/index';
// styles
import { Container, GithubLink, ListContainer, Pokeball } from './styledHomepage';
import { MainHeading, Button, Divider } from '@/BaseStyles';
// components
import Autocomplete from '@/components/Autocomplete';
import Particles from '@/components/Particles';
import PokemonList from './PokemonList';
import TypeList from './TypeList';
import Box from '@/components/Box';
// icons
import Github from 'public/static/iconLibrary/github.svg';

const Homepage = ({ allPokemon, pokemonTypes, allMoves }: PokestatsHomepageProps): JSX.Element => {
  // router
  const router = useRouter();
  // analytics
  const plausible = usePlausible();
  // memo
  const randomPokemonUrl = useMemo(
    () => `/pokemon/${allPokemon[getRandomInt(1, allPokemon.length)].name}`,
    [allPokemon],
  );
  // prefetch random pokemon page
  useEffect(() => {
    if (router && randomPokemonUrl) router.prefetch(randomPokemonUrl);
  }, [randomPokemonUrl, router]);

  return (
    <AnimatePresence mode="wait">
      <GithubLink
        href="https://github.com/andreferreiradlw/pokestats"
        target="_blank"
        rel="noopener"
        initial="hidden"
        animate="show"
        whileHover="hover"
        whileTap="tap"
        variants={fadeInUpVariant}
        key="homepage-github"
        onClick={() => plausible('Github Homepage')}
      >
        <Github />
      </GithubLink>
      <Container
        flexheight="100vh"
        flexalign="center"
        flexdirection="column"
        flexgap="1em"
        $contained
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
          filterList={[...allPokemon, ...pokemonTypes, ...allMoves]}
          variants={fadeInUpVariant}
          key="homepage-autocomplete"
        />
        <Button
          onClick={() => {
            plausible('Random Pokemon');
            router.push(randomPokemonUrl);
          }}
          $dark
          variants={fadeInUpVariant}
          key="homepage-random-btn"
        >
          Random Pokemon
          <Pokeball />
        </Button>
      </Container>
      <ListContainer
        flexpadding="1.5em 0"
        flexalign="center"
        flexjustify="center"
        key="homepage-list-container"
        initial="hidden"
        animate="show"
        variants={fadeInUpVariant}
      >
        <Box $contained $withGutter flexgap="1.5em">
          <TypeList types={pokemonTypes} />
          <Divider />
          <PokemonList pokemon={allPokemon} />
          <Divider />
        </Box>
      </ListContainer>
      <Particles key="homepage-particles" />
    </AnimatePresence>
  );
};

export default Homepage;
