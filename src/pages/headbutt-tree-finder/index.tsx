// types
import type { NextPage, GetServerSideProps } from 'next';
// components
import LayoutV2 from '@/components/LayoutV2';
import HeadbuttLocationsPage from '@/components/HeadbuttLocationsPage';
import Seo from '@/components/Seo';

export interface PokestatsHeadbuttLocationsPageProps {
  defaultLocation: string | null;
}

const PokestatsHeadbuttLocationsPage: NextPage<PokestatsHeadbuttLocationsPageProps> = props => {
  // Dynamic values for SEO
  const pageTitle = 'Headbutt Tree Calculator - Find Pokémon with Headbutt';
  const pageDescription =
    'This Headbutt Tree Calculator tool helps you locate Pokémon available through headbutting trees in different Generation II game areas.';
  const pageKeywords =
    'headbutt tree, Pokémon, tree locations, headbutt Pokémon, Pokémon finder, Pokémon Gold, Pokémon Silver, Pokémon Crystal, Headbutt Tree Calculator';

  return (
    <LayoutV2 withHeader customKey="kanto-gen1-region">
      <Seo
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        type="article"
        datePublished={new Date().toISOString()}
        dateModified={new Date().toISOString()}
      />
      <HeadbuttLocationsPage {...props} />
    </LayoutV2>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { location } = context.query;

  return {
    props: {
      defaultLocation: typeof location === 'string' ? location : null, // Ensure location is a string or null
    },
  };
};

export default PokestatsHeadbuttLocationsPage;
