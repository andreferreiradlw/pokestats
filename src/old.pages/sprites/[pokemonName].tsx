import { useMemo } from 'react';
// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonSpecies, NamedAPIResource } from 'pokenode-ts';
// helpers
import { PokemonApi, SpeciesApi } from '@/services';
import { capitalise, removeDash } from '@/helpers';
// components
import Seo from '@/components/Seo';
import LayoutV2 from '@/components/LayoutV2';
import SpritesPage from '@/components/SpritesPage';

export interface PokestatsSpritePageProps {
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
  allPokemonData: NamedAPIResource[];
  otherFormsData: Pokemon[] | null;
}

const PokestatsSpritePage: NextPage<PokestatsSpritePageProps> = props => {
  const englishName = useMemo(() => capitalise(removeDash(props.pokemon.name)), [props.pokemon]);

  const title = `${englishName} Pokémon Sprites - Animated, Shiny & More`;
  const description = `Explore detailed ${englishName} sprites for all forms, including front, back, shiny, animated, and gender-specific variations. View high-quality images of Pokémon sprites from all generations and learn about their different forms and appearances.`;
  const keywords = [
    `${englishName} Pokémon sprites`,
    `${englishName} shiny sprites`,
    `${englishName} animated sprites`,
    `${englishName} sprite variations`,
    `${englishName} front and back sprites`,
    `${englishName} gender differences`,
    `Pokémon ${englishName} forms`,
    `Pokémon ${englishName} sprite gallery`,
    `${englishName} Pokémon Generation ${props.pokemonSpecies.generation.name} sprites`,
    `${englishName} sprite images`,
    `Pokémon ${englishName} artwork`,
    `${englishName} evolution sprites`,
  ];

  return (
    <>
      <Seo title={title} description={description} keywords={keywords.join(', ')} />
      <LayoutV2 withHeader customKey={`pokemon-sprites-${props.pokemon.name}`}>
        <SpritesPage {...props} />
      </LayoutV2>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonList = await PokemonApi.listPokemons(0, 1302);
  // paths
  const paths = pokemonList.results.map(pokemon => {
    return {
      params: {
        pokemonName: pokemon.name,
      },
    };
  });

  // return static paths
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PokestatsSpritePageProps> = async ({ params }) => {
  // get current pokemon name from url params
  const pokemonName = params?.pokemonName as string;

  try {
    // fetch data
    const [pokemonData, { results: allPokemonData }] = await Promise.all([
      PokemonApi.getByName(pokemonName),
      PokemonApi.listPokemons(0, 1302),
    ]);

    const pokemonSpeciesData = await SpeciesApi.getByName(pokemonData.species.name);

    const otherForms = pokemonSpeciesData.varieties
      .filter(({ pokemon }) => pokemonName !== pokemon.name)
      .map(({ pokemon }) => PokemonApi.getByName(pokemon.name));

    let otherFormsData: Pokemon[] | null = null;

    if (otherForms.length > 0) otherFormsData = await Promise.all(otherForms);

    return {
      props: {
        pokemon: pokemonData,
        allPokemonData,
        pokemonSpecies: pokemonSpeciesData,
        otherFormsData,
      },
    };
  } catch (error) {
    console.log(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsSpritePage;
