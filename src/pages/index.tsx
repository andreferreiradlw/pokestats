// types
import type { GetStaticProps, NextPage } from 'next';
// helpers
import { PokestatsPageTitle } from '@/components/Head';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import Homepage from '@/components/Homepage';
import { PokemonApi, TypesApi } from '@/services';
import { NamedAPIResource } from 'pokenode-ts';

export interface PokestatsHomepageProps {
  allPokemon: NamedAPIResource[];
  pokemonTypes: NamedAPIResource[];
}

const PokestatsHomepage: NextPage<PokestatsHomepageProps> = props => (
  <>
    <Head>
      <meta property="og:title" content={PokestatsPageTitle} />
      <meta
        property="og:description"
        content="PokeStats.gg is an online encyclopedia of Pokémon species containing information such as Pokédex entries, descriptions, abilities, evolution chains, moves learned, stats and much more!"
      />
      <meta property="og:image" content="/static/android-icon-512x512.png" />
    </Head>
    <Layout $withGutter={false} layoutGap="0">
      <Homepage {...props} />
    </Layout>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [pokemonResponse, typesResponse] = await Promise.all([
      PokemonApi.listPokemons(0, 905),
      TypesApi.listTypes(0, 18),
    ]);

    if (!pokemonResponse || !typesResponse) {
      return { notFound: true };
    }

    return {
      props: {
        allPokemon: pokemonResponse.results,
        pokemonTypes: typesResponse.results,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsHomepage;
