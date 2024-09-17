// types
import type { NextPage, GetServerSideProps } from 'next';
// components
import Head from 'next/head';
import LayoutV2 from '@/components/LayoutV2';
import KantoGen1 from '@/components/RegionsPages/generation-i/kanto';

export interface PokestatsRegionsPageProps {
  location: string | null;
}

const PokestatsRegionsPage: NextPage<PokestatsRegionsPageProps> = ({ location }) => {
  return (
    <>
      <Head>
        <meta property="og:title" content="Regions" />
        <meta
          name="description"
          content="The Kanto region (Japanese: カントー地方 Kanto region) is a region of the Pokémon world. Kanto is located east of Johto, which together form a joint landmass that is south of Sinnoh."
        />
      </Head>
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
