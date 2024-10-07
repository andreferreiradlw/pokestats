// types
import type {
  Pokemon as PokenodePokemon,
  EvolutionChain,
  PokemonSpecies,
  Ability,
  NamedAPIResource,
} from 'pokenode-ts';
import type { Metadata } from 'next';
// helpers
import { AbilityApi, EvolutionApi, PokemonApi, SpeciesApi } from '@/services';
import { findEnglishFlavorText, findEnglishName, formatFlavorText, getResourceId } from '@/helpers';
import { notFound } from 'next/navigation';
// components
import { PokemonPage } from '@/PageComponents';
import { GameVersionProvider } from '@/context';

export interface PokestatsPokemonPageProps {
  allPokemon: NamedAPIResource[];
  pokemon: PokenodePokemon;
  abilities: Ability[];
  species: PokemonSpecies;
  evolutionData: EvolutionChain;
}

interface PokemonPageParams {
  params: { pokemonName: string };
}

export async function generateMetadata({
  params: { pokemonName },
}: PokemonPageParams): Promise<Metadata> {
  const { species, sprites } = await PokemonApi.getByName(pokemonName);
  const { names, id, flavor_text_entries } = await SpeciesApi.getByName(species.name);

  const pokemonEnglishName = findEnglishName(names);
  const pageTitle = `${pokemonEnglishName} - Pokémon #${id}`;
  const pageDescription = findEnglishFlavorText(flavor_text_entries);

  return {
    title: pageTitle,
    description: formatFlavorText(pageDescription),
    openGraph: {
      images: [
        {
          url: sprites.front_default!,
        },
      ],
    },
  };
}

const PokestatsPokemonPage = async ({ params: { pokemonName } }: PokemonPageParams) => {
  try {
    const [pokemonDataResults, { results: allPokemonData }] = await Promise.all([
      PokemonApi.getByName(pokemonName),
      PokemonApi.listPokemons(0, 1024),
    ]);

    if (!allPokemonData || !pokemonDataResults) {
      notFound();
    }

    const [pokemonAbilitiesResults, pokemonSpeciesResults] = await Promise.all([
      AbilityApi.getPokemonAbilities(pokemonDataResults),
      SpeciesApi.getByName(pokemonDataResults.species.name),
    ]);

    if (!pokemonSpeciesResults || !pokemonAbilitiesResults) {
      notFound();
    }

    const evolutionDataResults = await EvolutionApi.getById(
      getResourceId(pokemonSpeciesResults.evolution_chain.url),
    );

    if (!evolutionDataResults) {
      notFound();
    }

    pokemonSpeciesResults.flavor_text_entries = pokemonSpeciesResults.flavor_text_entries.filter(
      entry => entry.language.name === 'en',
    );

    pokemonSpeciesResults.genera = pokemonSpeciesResults.genera.filter(
      entry => entry.language.name === 'en',
    );

    const props: PokestatsPokemonPageProps = {
      allPokemon: allPokemonData,
      pokemon: pokemonDataResults,
      species: pokemonSpeciesResults,
      abilities: pokemonAbilitiesResults.map(ability => ({
        name: ability.name,
        effect_entries: ability.effect_entries.filter(entry => entry.language.name === 'en'),
      })) as Ability[],
      evolutionData: evolutionDataResults,
    };

    return (
      <GameVersionProvider pokemon={props.species}>
        <PokemonPage {...props} />
      </GameVersionProvider>
    );
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return notFound();
  }
};

// Static params generation for Pokémon pages
export async function generateStaticParams() {
  const pokemonList = await PokemonApi.listPokemons(0, 1024);

  return pokemonList.results.map(pokemon => ({
    pokemonName: pokemon.name,
  }));
}

export default PokestatsPokemonPage;
