'use client';

import { useMemo } from 'react';
// types
import type { NamedAPIResource } from 'pokenode-ts';
// helpers
import { usePlausible } from 'next-plausible';
import { getRandomInt } from '@/helpers';
import { hoverVariant } from '@/animations';
import { useRouter } from 'next/navigation';
// styles
import { FirstSection, GithubLink, Pokeball, SecondSection } from './styledHomepage';
// components
import PokemonList from './PokemonList';
import TypeList from './TypeList';
import AutocompleteV2 from '@/components/AutocompleteV2';
import { Container, Divider, Stack, Typography } from '@mui/material';
import CustomButton from '@/components/CustomButton';
// icons
import Github from 'public/static/iconLibrary/github.svg';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export interface ClientHomepageProps {
  pokemonTypes: NamedAPIResource[];
  pokemonList: NamedAPIResource[];
}

const ClientHomepage = ({ pokemonTypes, pokemonList }: ClientHomepageProps): JSX.Element => {
  // hooks
  const router = useRouter();
  const plausible = usePlausible();

  // memo
  const randomPokemonUrl = useMemo(
    () => (pokemonList ? `/pokemon/${pokemonList[getRandomInt(1, pokemonList.length)].name}` : ''),
    [pokemonList],
  );

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
          onClick={() => {
            plausible('Random Pokemon');
            router.push(randomPokemonUrl);
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
          <Stack gap={4} padding={{ xs: 2, md: 4 }} divider={<Divider />}>
            <TypeList types={pokemonTypes} />
            <PokemonList pokemon={pokemonList} />
          </Stack>
        </Container>
      </SecondSection>
    </>
  );
};

export default ClientHomepage;
