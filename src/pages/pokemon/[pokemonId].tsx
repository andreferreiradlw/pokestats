// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType } from '@/types';
import type { Pokemon as PokenodePokemon, PokemonSpecies, EvolutionChain } from 'pokenode-ts';
// helpers
import { PokemonClient, EvolutionClient } from 'pokenode-ts';
// components
import Layout from '@/components/Layout';
import PokemonPage from '@/components/Pokemon';

export interface PokestatsPokemonPageProps {
  allPokemon: Pokemon[];
  allPokemonTypes: PokemonType[];
  pokemon: PokenodePokemon;
  species: PokemonSpecies;
  evolution: EvolutionChain;
}

const PokestatsPokemonPage: NextPage<PokestatsPokemonPageProps> = ({ ...props }) => {
  return (
    <Layout withHeader withFooter={true} withMain={false}>
      <PokemonPage {...props} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const api = new PokemonClient();

  const pokemonList = await api.listPokemons(0, 809);
  // paths
  const paths = pokemonList.results.map(pokemon => {
    return {
      params: {
        pokemonId: pokemon.name,
      },
    };
  });
  // return static paths
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // clients
  const pokemonClient = new PokemonClient();
  const evolutionClient = new EvolutionClient();

  const pokemonName = params.pokemonId as string;

  try {
    const [
      { results: allPokemonDataResults },
      { results: allTypesDataResults },
      pokemonDataResults,
      pokemonSpeciesResults,
    ] = await Promise.all([
      pokemonClient.listPokemons(0, 809),
      pokemonClient.listTypes(),
      pokemonClient.getPokemonByName(pokemonName),
      pokemonClient.getPokemonSpeciesByName(pokemonName),
    ]);

    if (
      !allPokemonDataResults ||
      !allTypesDataResults ||
      !pokemonDataResults ||
      !pokemonSpeciesResults
    ) {
      console.error('Failed to fetch allPokemonData, typesData, pokemonData or pokemonSpecies');
      return { notFound: true };
    }
    // get evolution chain id from url
    const evolutionChainId = pokemonSpeciesResults.evolution_chain.url.match(
      /\/evolution-chain\/(\d+)\//,
    );

    const evolutionDataResults = await evolutionClient.getEvolutionChainById(
      Number(evolutionChainId[1]),
    );

    if (!evolutionDataResults) {
      console.error('Failed to fetch evolutionData');
      return { notFound: true };
    }

    // species english flavor text
    pokemonSpeciesResults.flavor_text_entries = pokemonSpeciesResults.flavor_text_entries.filter(
      entry => entry.language.name === 'en',
    );
    // species genus
    pokemonSpeciesResults.genera = pokemonSpeciesResults.genera.filter(
      entry => entry.language.name === 'en',
    );

    return {
      props: {
        allPokemon: allPokemonDataResults.map((pokemon, index) => {
          return { ...pokemon, id: index + 1, assetType: 'pokemon' };
        }),
        allPokemonTypes: allTypesDataResults.map((type, index) => {
          return { ...type, id: index + 1, assetType: 'type' };
        }),
        pokemon: pokemonDataResults,
        species: pokemonSpeciesResults,
        evolution: evolutionDataResults,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsPokemonPage;
