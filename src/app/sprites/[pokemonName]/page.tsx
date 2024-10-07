// types
import type { Pokemon, PokemonSpecies, NamedAPIResource } from 'pokenode-ts';
// helpers
import { PokemonApi, SpeciesApi } from '@/services';
import { notFound } from 'next/navigation';
// components
import { SpritesPage } from '@/PageComponents';

export interface PokestatsSpritePageProps {
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
  allPokemonData: NamedAPIResource[];
  otherFormsData: Pokemon[];
}

const PokestatsSpritePage = async ({ params }: { params: { pokemonName: string } }) => {
  const pokemonName = params.pokemonName;

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
