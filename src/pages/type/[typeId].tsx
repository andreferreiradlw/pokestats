// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { MoveType, Pokemon, PokemonType } from '@/types';
// helpers
import { PokemonClient, MoveClient, Type, Move } from 'pokenode-ts';
import { fetchAutocompleteData, findEnglishName, getIdFromMove, getIdFromPokemon } from '@/helpers';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import TypePage from '@/components/Type';

interface PokestatsType extends Omit<Type, 'pokemon'> {
  pokemon: Pokemon[];
}

export interface PokestatsTypePageProps {
  autocompleteList: (Pokemon | PokemonType | MoveType)[];
  typeInfo: PokestatsType;
  typeMoves: Move[];
}

const PokestatsTypePage: NextPage<PokestatsTypePageProps> = ({ autocompleteList, ...props }) => {
  const typeName = findEnglishName(props.typeInfo.names);
  const pageTitle = `${typeName} (Type) - Pokestats.gg`;
  const pageDescription = `The ${typeName} type ( Japanese: ${
    props.typeInfo.names.find(name => name.language.name === 'ja-Hrkt').name
  }タイプ ) is one of the eighteen elemental types in the Pokémon world.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${typeName}, Pokemon, Pokémon, Pokédex, Pokestats, Type`} />
        {/** Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content={`public/static/typeIcons/${props.typeInfo.name.toLocaleLowerCase()}.svg`}
        />
      </Head>
      <Layout withHeader={{ autocompleteList: autocompleteList }}>
        <TypePage {...props} />
      </Layout>
    </>
  );
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
    // fetch data
    const typeData = await pokemonClient.getTypeByName(typeName);
    const { allMovesData, allPokemonData, allTypesData } = await fetchAutocompleteData();

    if (!typeData || !allTypesData || !allMovesData || !allPokemonData) {
      console.log('Failed to fetch typeData');
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
        if (id <= 905) {
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
        autocompleteList: [...allPokemonData, ...allTypesData, ...allMovesData],
        typeInfo: { ...typeData, pokemon: pokemonListWithId },
        typeMoves: allPokemonMovesData,
        revalidate: 90, // In seconds
      },
    };
  } catch (error) {
    console.log(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsTypePage;
