// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// helpers
import { Type } from 'pokenode-ts';
import { findEnglishName } from '@/helpers';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import TypePage from '@/components/Type';
import { TypesApi } from '@/services';

// interface PokestatsType extends Omit<Type, 'pokemon'> {
//   pokemon: Pokemon[];
// }

export interface PokestatsTypePageProps {
  typeData: Type;
}

const PokestatsTypePage: NextPage<PokestatsTypePageProps> = props => {
  const { names, name } = props.typeData;

  const typeName = findEnglishName(names);
  const pageTitle = `${typeName} (Type) - Pokestats.gg`;
  const pageDescription = `The ${typeName} type ( Japanese: ${
    names.find(({ language }) => language.name === 'ja-Hrkt').name
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
          content={`public/static/typeIcons/${name.toLocaleLowerCase()}.svg`}
        />
      </Head>
      <Layout withHeader={{}}>
        <TypePage {...props} />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // data
  const typeList = await TypesApi.getAll();

  const paths = typeList.map(({ name }) => {
    return {
      params: {
        typeId: name,
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
  // const moveClient = new MoveClient();

  // params
  const typeName = params.typeId as string;

  try {
    // fetch data
    const typeData = await TypesApi.getByName(typeName);
    // const { allMovesData, allPokemonData, allTypesData } = await fetchAutocompleteData();

    if (!typeData) {
      console.log('Failed to fetch typeData');
      return { notFound: true };
    }

    // // move requests array
    // let moveRequests = [];
    // // create an axios request for each move
    // typeData.moves.forEach(({ url }) =>
    //   moveRequests.push(moveClient.getMoveById(getIdFromMove(url))),
    // );

    // const allPokemonMovesData: Move[] = await Promise.all(moveRequests);

    // const pokemonListWithId = typeData.pokemon
    //   .map(({ pokemon }) => {
    //     const id = getIdFromPokemon(pokemon.url);
    //     // if pokemon not gen 8
    //     if (id <= 905) {
    //       return {
    //         ...pokemon,
    //         id: id,
    //         assetType: 'pokemon',
    //       };
    //     }
    //     return null;
    //   })
    //   .filter(Boolean);

    return {
      props: {
        typeData,
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
