// types
import type { PokestatsHomepageProps } from '@/app/page';
// components
import RandomButton from './RandomButton';
import PokemonList from './PokemonList';
import TypeList from './TypeList';
import AutocompleteV2 from '@/components/AutocompleteV2';
import { Container, Divider, Stack, Typography } from '@mui/material';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { FirstSection, GithubLink, SecondSection } from './styledHomepage';
// icons
import Github from 'public/static/iconLibrary/github.svg';

const Homepage = ({ pokemonTypes, pokemonList }: PokestatsHomepageProps): JSX.Element => {
  return (
    <>
      <ThemeToggleButton position="absolute" top="25px" right="20px" />
      <GithubLink
        href="https://github.com/andreferreiradlw/pokestats"
        target="_blank"
        rel="noopener"
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        key="homepage-github"
      >
        <Github />
      </GithubLink>
      <FirstSection>
        <Typography variant="mainHeading">PokeStats</Typography>
        <AutocompleteV2 />
        <RandomButton pokemonList={pokemonList} />
      </FirstSection>
      <SecondSection>
        <Container maxWidth="xl">
          <Stack gap={4} padding={{ xs: 2, md: 4 }} divider={<Divider />}>
            <TypeList types={pokemonTypes} />
            <PokemonList pokemon={pokemonList} />
          </Stack>
        </Container>
      </SecondSection>
    </>
  );
};

export default Homepage;
