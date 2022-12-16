// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon } from '@/types';
// helpers
import { PokemonClient, MoveClient, Type, Move } from 'pokenode-ts';
import { getIdFromMove, getIdFromPokemon } from '@/helpers';
// components
import TypePage from '@/components/Type';

interface PokestatsType extends Omit<Type, 'pokemon'> {
  pokemon: Pokemon[];
}

export interface PokestatsTypePageProps {
  typeInfo: PokestatsType;
  typeMoves: Move[];
}

const PokestatsTypePage: NextPage<PokestatsTypePageProps> = ({ ...props }) => {
  return <TypePage {...props} />;
};

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
    const typeData: Type = await pokemonClient.getTypeByName(typeName);

    if (!typeData) {
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
        typeInfo: { ...typeData, pokemon: pokemonListWithId },
        typeMoves: allPokemonMovesData,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsTypePage;
