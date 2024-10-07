// types
import type { Pokemon, PokemonSpecies, NamedAPIResource } from 'pokenode-ts';
import type { Metadata } from 'next';
// helpers
import { PokemonApi, SpeciesApi } from '@/services';
import { notFound } from 'next/navigation';
import { findEnglishName } from '@/helpers';
// components
import { SpritesPage } from '@/PageComponents';

export interface PokestatsSpritePageProps {
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
  allPokemonData: NamedAPIResource[];
  otherFormsData: Pokemon[];
}

interface PokemonSpritesPageParams {
  params: { pokemonName: string };
}

export async function generateMetadata({
  params: { pokemonName },
}: PokemonSpritesPageParams): Promise<Metadata> {
  const { species, sprites } = await PokemonApi.getByName(pokemonName);
  const { names } = await SpeciesApi.getByName(species.name);

  const pokemonEnglishName = findEnglishName(names);

  return {
    title: `${pokemonEnglishName} Pokémon Sprites - Animated, Shiny & More`,
    description: `Explore detailed ${pokemonEnglishName} sprites for all forms, including front, back, shiny, animated, and gender-specific variations. View high-quality images of Pokémon sprites from all generations and learn about their different forms and appearances.`,
    openGraph: {
      images: [
        {
          url: sprites.front_default!,
        },
      ],
    },
  };
}

const PokestatsSpritePage = async ({ params: { pokemonName } }: PokemonSpritesPageParams) => {
  try {
    // Fetch data
    const [pokemonData, { results: allPokemonData }] = await Promise.all([
      PokemonApi.getByName(pokemonName),
      PokemonApi.listPokemons(0, 1302),
    ]);

    if (!pokemonData) {
      notFound(); // Trigger the 404 page
    }

    const pokemonSpeciesData = await SpeciesApi.getByName(pokemonData.species.name);

    if (!pokemonSpeciesData) {
      notFound(); // Trigger the 404 page
    }

    const otherForms = pokemonSpeciesData.varieties
      .filter(({ pokemon }) => pokemonName !== pokemon.name)
      .map(({ pokemon }) => PokemonApi.getByName(pokemon.name));

    const otherFormsData = await Promise.all(otherForms);

    const props: PokestatsSpritePageProps = {
      pokemon: pokemonData,
      allPokemonData,
      pokemonSpecies: pokemonSpeciesData,
      otherFormsData,
    };

    return <SpritesPage {...props} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export async function generateStaticParams() {
  const pokemonList = await PokemonApi.listPokemons(0, 1302); // pokemon + varieties

  return pokemonList.results.map(pokemon => ({
    pokemonName: pokemon.name,
  }));
}

export default PokestatsSpritePage;
