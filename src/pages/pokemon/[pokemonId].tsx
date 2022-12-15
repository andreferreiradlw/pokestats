// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType, PokemonMove } from '@/types';
import type { Pokemon as PokenodePokemon, EvolutionChain, PokemonSpecies } from 'pokenode-ts';
// helpers
import { PokemonClient, EvolutionClient, MoveClient } from 'pokenode-ts';
import { getIdFromEvolutionChain, getIdFromSpecies, getIdFromMove } from '@/helpers';
// components
import Layout from '@/components/Layout';
import PokemonPage from '@/components/Pokemon';

export interface PokestatsPokemonPageProps {
  allPokemon: Pokemon[];
  allPokemonTypes: PokemonType[];
  pokemon: PokenodePokemon;
  species: PokemonSpecies;
  evolution: EvolutionChain;
  pokemonMoves: PokemonMove[];
}

const PokestatsPokemonPage: NextPage<PokestatsPokemonPageProps> = ({
  allPokemonTypes,
  allPokemon,
  ...props
}) => {
  return (
    <Layout
      withHeader
      withFooter={true}
      withMain={false}
      autocompleteList={[...allPokemonTypes, ...allPokemon]}
    >
      <PokemonPage allPokemon={allPokemon} {...props} />
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
  const moveClient = new MoveClient();

  const pokemonName = params.pokemonId as string;

  try {
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

    // move requests array
    let moveRequests = [];
    // create an axios request for each move
    pokemonDataResults.moves.forEach(({ move }) =>
      moveRequests.push(moveClient.getMoveById(getIdFromMove(move.url))),
    );

    const allPokemonMovesData = await Promise.all(moveRequests);

    if (!allPokemonMovesData) {
      console.error('Failed to fetch allPokemonMovesData');
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
        allPokemon: allPokemonDataResults.map((currPokemon, i) => {
          return { ...currPokemon, id: i + 1, assetType: 'pokemon' };
        }),
        allPokemonTypes: allTypesDataResults.map((currType, i) => {
          return { ...currType, id: i + 1, assetType: 'type' };
        }),
        pokemon: pokemonDataResults,
        species: pokemonSpeciesResults,
        evolution: evolutionDataResults,
        pokemonMoves: allPokemonMovesData
          .map((currMove, i) => {
            // version details from pokemon moves info
            return {
              ...currMove,
              version_group_details: pokemonDataResults.moves[i].version_group_details,
            };
          })
          .filter(data => data), // filter empty
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsPokemonPage;
