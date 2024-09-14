// types
import type { GetStaticProps, NextPage } from 'next';
// helpers
import type { NamedAPIResource } from 'pokenode-ts';
import { LocationClient } from 'pokenode-ts';
// components
import Head from 'next/head';
import RegionsPage from '@/components/RegionsPage';
import LayoutV2 from '@/components/LayoutV2';

export interface PokestatsRegionsPageProps {
  regions: NamedAPIResource[];
}

const PokestatsRegionsPage: NextPage<PokestatsRegionsPageProps> = props => (
  <>
    <Head>
      <meta property="og:title" content="Regions" />
    </Head>
    <LayoutV2 withHeader customKey="regions-homepage">
      <RegionsPage {...props} />
    </LayoutV2>
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
