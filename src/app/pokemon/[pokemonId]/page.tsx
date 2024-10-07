// types
import type {
  Pokemon as PokenodePokemon,
  EvolutionChain,
  PokemonSpecies,
  Ability,
  NamedAPIResource,
} from 'pokenode-ts';
// helpers
import { AbilityApi, EvolutionApi, PokemonApi, SpeciesApi } from '@/services';
import { getResourceId } from '@/helpers';
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

const PokestatsPokemonPage = async ({ params }: { params: { pokemonId: string } }) => {
  const pokemonName = params.pokemonId;

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
    pokemonId: pokemon.name,
  }));
}

export default PokestatsPokemonPage;
