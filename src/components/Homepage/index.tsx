import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
// heplpers
import { usePlausible } from 'next-plausible';
import { fadeInUpVariant, getRandomInt } from '@/helpers';
// types
import type { PokestatsHomepageProps } from '@/pages/index';
// styles
import { Container, GithubLink, ListContainer, Pokeball } from './styledHomepage';
// components
import Particles from '@/components/Particles';
import PokemonList from './PokemonList';
import TypeList from './TypeList';
import Box from '@/components/Box';
import { motion } from 'framer-motion';
// icons
import Github from 'public/static/iconLibrary/github.svg';
import AutocompleteV2 from '../AutocompleteV2';
import { Button, Divider, Typography } from '@mui/material';
import { usePokemonList } from '@/hooks/usePokemonList';
import Loading from '../Loading';

const Homepage = ({ pokemonTypes }: PokestatsHomepageProps): JSX.Element => {
  // hooks
  const router = useRouter();
  const plausible = usePlausible();
  const { data: allPokemon, isLoading } = usePokemonList();

  // memo
  const randomPokemonUrl = useMemo(
    () => (allPokemon ? `/pokemon/${allPokemon[getRandomInt(1, allPokemon.length)].name}` : ''),
    [allPokemon],
  );

  // prefetch random pokemon page
  useEffect(() => {
    if (router && randomPokemonUrl !== '') router.prefetch(randomPokemonUrl);
  }, [randomPokemonUrl, router]);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeInUpVariant}
        key="homepage-container"
      >
        <GithubLink
          href="https://github.com/andreferreiradlw/pokestats"
          target="_blank"
          rel="noopener"
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
        >
          <Typography variant="mainHeading">PokeStats</Typography>
          <AutocompleteV2 />
          <Button
            onClick={async () => {
              plausible('Random Pokemon');
              await router.push(randomPokemonUrl);
            }}
            variant="contained"
            color="secondary"
          >
            Random Pokemon
            <Pokeball />
          </Button>
        </Container>
        <ListContainer flexpadding="1.5em 0" flexalign="center" flexjustify="center">
          <Box $contained $withGutter flexgap="1.5em">
            <TypeList types={pokemonTypes} />
            <Divider />
            {isLoading ? (
              <Loading $withGutter $iconWidth="50px" />
            ) : (
              <PokemonList pokemon={allPokemon} />
            )}
            <Divider />
          </Box>
        </ListContainer>
      </motion.div>
      <Particles />
    </>
  );
};

export default Homepage;
