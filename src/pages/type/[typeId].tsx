// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType } from '@/types';
// helpers
import { PokemonClient, MoveClient, Type, Move } from 'pokenode-ts';
import { getIdFromMove, getIdFromPokemon, removeDash } from '@/helpers';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import TypePage from '@/components/Type';

interface PokestatsType extends Omit<Type, 'pokemon'> {
  pokemon: Pokemon[];
}

export interface PokestatsTypePageProps {
  autocompleteList: (Pokemon | PokemonType)[];
  typeInfo: PokestatsType;
  typeMoves: Move[];
}

const PokestatsTypePage: NextPage<PokestatsTypePageProps> = ({ autocompleteList, ...props }) => (
  <>
    <Head>
      <title>
        {`${removeDash(
          props.typeInfo.name,
        )} (Type) - PokeStats.gg - The online open-sourced Pokémon encyclopaedia. Pokédex powered by PokeApi.`}
      </title>
    </Head>
    <Layout withHeader={{ autocompleteList: autocompleteList }}>
      <TypePage {...props} />
    </Layout>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  // clients
  const pokemonClient = new PokemonClient();

  const typeList = await pokemonClient.listTypes();

  const paths = typeList.results.map(type => {
    return {
      params: {
        typeId: type.name,
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
  const moveClient = new MoveClient();

  const typeName = params.typeId as string;

  try {
    // fetch data
    const [{ results: allPokemonDataResults }, { results: allTypesDataResults }, typeData] =
      await Promise.all([
        pokemonClient.listPokemons(0, 809),
        pokemonClient.listTypes(),
        pokemonClient.getTypeByName(typeName),
      ]);

    if (!allPokemonDataResults || !allTypesDataResults || !typeData) {
      console.error('Failed to fetch typeData');
      return { notFound: true };
    }

    // move requests array
    let moveRequests = [];
    // create an axios request for each move
    typeData.moves.forEach(({ url }) =>
      moveRequests.push(moveClient.getMoveById(getIdFromMove(url))),
    );

    const allPokemonMovesData: Move[] = await Promise.all(moveRequests);

    const pokemonListWithId = typeData.pokemon
      .map(({ pokemon }) => {
        const id = getIdFromPokemon(pokemon.url);
        // if pokemon not gen 8
        if (id <= 809) {
          return {
            ...pokemon,
            id: id,
            assetType: 'pokemon',
          };
        }
        return null;
      })
      .filter(Boolean);

    return {
      props: {
        autocompleteList: [
          ...allPokemonDataResults.map((currPokemon, i) => ({
            ...currPokemon,
            id: i + 1,
            assetType: 'pokemon',
          })),
          ...allTypesDataResults.map((currType, i) => ({
            ...currType,
            id: i + 1,
            assetType: 'type',
          })),
        ],
        typeInfo: { ...typeData, pokemon: pokemonListWithId },
        typeMoves: allPokemonMovesData,
        revalidate: 90, // In seconds
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsTypePage;
