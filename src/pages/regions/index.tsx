// types
import type { GetStaticProps, NextPage } from 'next';
// import type { Pokemon, PokemonType, MoveType } from '@/types';
// helpers
import { LocationClient, NamedAPIResource } from 'pokenode-ts';
// import { PokestatsPageTitle } from '@/components/Head';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import RegionsPage from '@/components/RegionsPage';

export interface PokestatsRegionsPageProps {
  regions: NamedAPIResource[];
}

const PokestatsRegionsPage: NextPage<PokestatsRegionsPageProps> = props => (
  <>
    <Head>
      <meta property="og:title" content="Regions" />
    </Head>
    <Layout $withGutter={false} layoutGap="0">
      <RegionsPage {...props} />
    </Layout>
  </>
);

export const getStaticProps: GetStaticProps<PokestatsRegionsPageProps> = async () => {
  const locationClient = new LocationClient();

  try {
    const [{ results: regionsData }] = await Promise.all([locationClient.listRegions(0, 10)]);

    if (!regionsData) {
      return { notFound: true };
    }

    return {
      props: {
        regions: regionsData,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsRegionsPage;
