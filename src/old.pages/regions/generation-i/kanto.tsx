// types
import type { NextPage, GetServerSideProps } from 'next';
// components
import Seo from '@/components/Seo'; // Import the Seo component
import LayoutV2 from '@/components/LayoutV2';
import KantoGen1 from '@/components/RegionsPages/generation-i/kanto';

export interface PokestatsRegionsPageProps {
  location: string | null;
}

const PokestatsRegionsPage: NextPage<PokestatsRegionsPageProps> = ({ location }) => {
  // SEO-related variables
  const pageTitle = 'Kanto (Generation I)';
  const pageDescription =
    'Explore the Kanto region from Generation I of the Pokémon series. Discover key locations and Pokémon encounters, featuring Pokémon from the original games like Red, Blue, and Yellow.';
  const pageKeywords =
    'Kanto, Generation I, Pokémon, Pokémon region, Pokémon Red, Pokémon Blue, Pokémon Yellow, Pokédex, Pokémon guide, Pokémon encounters, Kanto map, Pokestats';
  const pageImage =
    'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/maps/generation-i/map.png';

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        image={pageImage}
        keywords={pageKeywords}
      />
      <LayoutV2 withHeader customKey="kanto-gen1-region">
        <KantoGen1 location={location} />
      </LayoutV2>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { location } = context.query;

  return {
    props: {
      location: typeof location === 'string' ? location : null, // Ensure location is a string or null
    },
  };
};

export default PokestatsRegionsPage;
