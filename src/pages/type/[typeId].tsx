// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// helpers
import type { Type } from 'pokenode-ts';
import { findEnglishName } from '@/helpers';
// components
import Seo from '@/components/Seo'; // Import the Seo component
import TypePage from '@/components/Type';
import { TypesApi } from '@/services';
import LayoutV2 from '@/components/LayoutV2';

export interface PokestatsTypePageProps {
  typeData: Type;
}

const PokestatsTypePage: NextPage<PokestatsTypePageProps> = props => {
  const { names, name } = props.typeData;

  // SEO-related variables
  const typeName = findEnglishName(names);
  const pageTitle = `${typeName} Type - Pokémon Guide`;
  const pageDescription = `Explore the ${typeName} type in the Pokémon world, including strengths, weaknesses, and key Pokémon. Learn about the ${typeName} type's unique characteristics and how it fits into battles.`;
  const pageKeywords = `${typeName}, Pokémon, Pokémon type, ${typeName} type, Pokémon strengths, Pokémon weaknesses, Pokestats, Type guide, Pokémon guide`;
  const pageImage = `/static/typeIcons/${name.toLowerCase()}.svg`;

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        image={pageImage}
        keywords={pageKeywords}
      />
      <LayoutV2 withHeader customKey={`type-${props.typeData.id}`}>
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
