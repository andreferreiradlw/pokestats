import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
// heplpers
import { usePlausible } from 'next-plausible';
import { getRandomInt } from '@/helpers';
import { hoverVariant } from '@/animations';
// types
import type { PokestatsHomepageProps } from '@/pages/index';
// styles
import { FirstSection, GithubLink, Pokeball, SecondSection } from './styledHomepage';
// components
import PokemonList from './PokemonList';
import TypeList from './TypeList';
import AutocompleteV2 from '../AutocompleteV2';
import { Container, Divider, Stack, Typography } from '@mui/material';
import CustomButton from '@/components/CustomButton';
// icons
import Github from 'public/static/iconLibrary/github.svg';
import ThemeToggleButton from '../ThemeToggleButton';

const Homepage = ({ pokemonTypes, pokemonList }: PokestatsHomepageProps): JSX.Element => {
  // hooks
  const router = useRouter();
  const plausible = usePlausible();

  // memo
  const randomPokemonUrl = useMemo(
    () => (pokemonList ? `/pokemon/${pokemonList[getRandomInt(1, pokemonList.length)].name}` : ''),
    [pokemonList],
  );

  // prefetch random pokemon page
  useEffect(() => {
    if (router && randomPokemonUrl !== '') router.prefetch(randomPokemonUrl);
  }, [randomPokemonUrl, router]);

  return (
    <>
      <ThemeToggleButton position="absolute" top="25px" right="20px" />
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
          size="large"
          endIcon={<Pokeball />}
        >
          Random Pokémon
        </CustomButton>
      </FirstSection>
      <SecondSection>
        <Container maxWidth="xl">
          <Stack gap="1.5em" padding={{ xs: 2, md: 4 }} divider={<Divider />}>
            <TypeList types={pokemonTypes} />
            <PokemonList pokemon={pokemonList} />
          </Stack>
        </Container>
      </SecondSection>
    </>
  );
};

export default Homepage;
