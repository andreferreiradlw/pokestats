// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// helpers
import type { Type } from 'pokenode-ts';
import { findEnglishName } from '@/helpers';
// components
import Head from 'next/head';
import TypePage from '@/components/Type';
import { TypesApi } from '@/services';
import LayoutV2 from '@/components/LayoutV2';

export interface PokestatsTypePageProps {
  typeData: Type;
}

const PokestatsTypePage: NextPage<PokestatsTypePageProps> = props => {
  const { names, name } = props.typeData;

  const typeName = findEnglishName(names);
  const pageTitle = `${typeName} (Type) - Pokestats.gg`;
  const pageDescription = `The ${typeName} type ( Japanese: ${
    names.find(({ language }) => language.name === 'ja-Hrkt')?.name
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
      <LayoutV2 withHeader key={`type-${props.typeData.id}`}>
        <TypePage {...props} />
      </LayoutV2>
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
  // params
  const typeName = params?.typeId as string;

  try {
    // fetch data
    const typeData = await TypesApi.getByName(typeName);

    if (!typeData) {
      console.log('Failed to fetch typeData');
      return { notFound: true };
    }

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
