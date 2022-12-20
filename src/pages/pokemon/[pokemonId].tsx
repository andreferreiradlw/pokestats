import { useRouter } from 'next/router';
// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType, PokemonMove } from '@/types';
import type {
  Pokemon as PokenodePokemon,
  EvolutionChain,
  PokemonSpecies,
  VersionGroup,
} from 'pokenode-ts';
// helpers
import { PokemonClient, EvolutionClient } from 'pokenode-ts';
import {
  getIdFromEvolutionChain,
  getIdFromSpecies,
  mapGenerationToGame,
  removeDash,
} from '@/helpers';
import { PokestatsPageTitle } from '@/components/Head';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import PokemonPage from '@/components/Pokemon';
import Loading from '@/components/Loading';

export interface PokestatsPokemonPageProps {
  allPokemon: Pokemon[];
  allPokemonTypes: PokemonType[];
  pokemon: PokenodePokemon;
  species: PokemonSpecies;
  evolution: EvolutionChain;
  pokemonMoves: PokemonMove[];
  pokemonGen: VersionGroup['name'];
}

const PokestatsPokemonPage: NextPage<PokestatsPokemonPageProps> = ({
  allPokemonTypes,
  allPokemon,
  pokemonGen,
  ...props
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Loading
        height="100vh"
        text="Loading Pokemon"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
      />
    );
  }

  return (
    <>
      <Head>
        <title>{`${removeDash(props.pokemon.name)} (Pokemon) - ${PokestatsPageTitle}`}</title>
      </Head>
      <Layout
        withHeader={{
          autocompleteList: [].concat(allPokemon, allPokemonTypes),
          pokemonGen: pokemonGen,
        }}
      >
        <PokemonPage allPokemon={allPokemon} {...props} />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const api = new PokemonClient();

  const pokemonList = await api.listPokemons(0, 151);
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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // clients
  const pokemonClient = new PokemonClient();
  const evolutionClient = new EvolutionClient();

  const pokemonName = params.pokemonId as string;

  try {
    // fetch data
    const [
      { results: allPokemonDataResults },
      { results: allTypesDataResults },
      pokemonDataResults,
    ] = await Promise.all([
      pokemonClient.listPokemons(0, 809),
      pokemonClient.listTypes(),
      pokemonClient.getPokemonByName(pokemonName),
    ]);

    if (!allPokemonDataResults || !allTypesDataResults || !pokemonDataResults) {
      console.error('Failed to fetch allPokemonData, typesData, pokemonData or pokemonSpecies');
      return { notFound: true };
    }

    if (pokemonDataResults.id > 809) return { notFound: true };

    // get evolution chain id from url
    const pokemonSpeciesResults = await pokemonClient.getPokemonSpeciesById(
      getIdFromSpecies(pokemonDataResults.species.url),
    );

    if (!pokemonSpeciesResults) {
      console.error('Failed to fetch pokemonSpeciesResults');
      return { notFound: true };
    }

    // get evolution chain id from url
    const evolutionDataResults = await evolutionClient.getEvolutionChainById(
      getIdFromEvolutionChain(pokemonSpeciesResults.evolution_chain.url),
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

    const { game_indices } = pokemonDataResults;
    const { generation } = pokemonSpeciesResults;
    const pokemonGen = game_indices?.[0]
      ? game_indices[0].version.name
      : mapGenerationToGame(generation.name);

    return {
      props: {
        allPokemon: allPokemonDataResults.map((currPokemon, i) => ({
          ...currPokemon,
          id: i + 1,
          assetType: 'pokemon',
        })),
        allPokemonTypes: allTypesDataResults.map((currType, i) => ({
          ...currType,
          id: i + 1,
          assetType: 'type',
        })),
        pokemon: pokemonDataResults,
        species: pokemonSpeciesResults,
        evolution: evolutionDataResults,
        pokemonGen,
        revalidate: 60,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsPokemonPage;
