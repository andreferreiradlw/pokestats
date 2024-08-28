import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
// heplpers
import { usePlausible } from 'next-plausible';
import { getRandomInt, hoverVariant } from '@/helpers';
import { usePokemonList } from '@/hooks';
// types
import type { PokestatsHomepageProps } from '@/pages/index';
// styles
import { FirstSection, GithubLink, Pokeball, SecondSection } from './styledHomepage';
// components
import PokemonList from './PokemonList';
import TypeList from './TypeList';
import AutocompleteV2 from '../AutocompleteV2';
import { Container, Divider, Stack, Typography } from '@mui/material';
import LoadingV2 from '../LoadingV2';
// icons
import Github from 'public/static/iconLibrary/github.svg';
import { AnimatePresence } from 'framer-motion';
import CustomButton from '@/components/CustomButton';

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
      <GithubLink
        href="https://github.com/andreferreiradlw/pokestats"
        target="_blank"
        rel="noopener"
        whileHover="hover"
        whileTap="tap"
        variants={hoverVariant}
        key="homepage-github"
        onClick={() => plausible('Github Homepage')}
      >
        <Github />
      </GithubLink>
      <FirstSection>
        <Typography variant="mainHeading">PokeStats</Typography>
        <AutocompleteV2 />
        <CustomButton
          onClick={async () => {
            plausible('Random Pokemon');
            await router.push(randomPokemonUrl);
          }}
          variant="contained"
          color="secondary"
        >
          Random Pokemon
          <Pokeball />
        </CustomButton>
      </FirstSection>
      <SecondSection>
        <Container maxWidth="xl">
          <Stack gap="1.5em" padding={{ xs: 2, md: 4 }} divider={<Divider />}>
            <TypeList types={pokemonTypes} />
            <AnimatePresence mode="wait">
              {isLoading ? <LoadingV2 $iconWidth={12} /> : <PokemonList pokemon={allPokemon} />}
            </AnimatePresence>
          </Stack>
        </Container>
      </SecondSection>
    </>
  );
};

export default Homepage;
