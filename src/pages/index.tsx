// types
import type { GetStaticProps, NextPage } from 'next';
// helpers
import { PokestatsPageTitle } from '@/components/Head';
import { fadeInUpVariant } from '@/animations';
// components
import Head from 'next/head';
import Homepage from '@/components/Homepage';
import { TypesApi } from '@/services';
import { NamedAPIResource } from 'pokenode-ts';
import LayoutV2 from '@/components/LayoutV2';
import Particles from '@/components/Particles';
import { Grid2 } from '@mui/material';

export interface PokestatsHomepageProps {
  pokemonTypes: NamedAPIResource[];
}

const PokestatsHomepage: NextPage<PokestatsHomepageProps> = props => (
  <Grid2 container>
    <Head>
      <meta property="og:title" content={PokestatsPageTitle} />
      <meta
        property="og:description"
        content="PokeStats.gg is an online encyclopedia of Pokémon species containing information such as Pokédex entries, descriptions, abilities, evolution chains, moves learned, stats and much more!"
      />
      <meta property="og:image" content="/static/android-icon-512x512.png" />
    </Head>
    <LayoutV2 initial="hidden" animate="show" variants={fadeInUpVariant} key="homepage-container">
      <Homepage {...props} />
    </LayoutV2>
    <Particles />
  </Grid2>
);

export const getStaticProps: GetStaticProps = async () => {
  try {
    const typesResponse = await TypesApi.getAll();

    if (!typesResponse) {
      return { notFound: true };
    }

    return {
      props: {
        pokemonTypes: typesResponse,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsHomepage;
