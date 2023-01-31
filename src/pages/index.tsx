// types
import type { GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType, MoveType } from '@/types';
// helpers
import { PokestatsPageTitle } from '@/components/Head';
import { fetchAutocompleteData } from '@/helpers';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import Homepage from '@/components/Homepage';

export interface PokestatsHomepageProps {
  allPokemon: Pokemon[];
  pokemonTypes: PokemonType[];
  allMoves: MoveType[];
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
    const { allMovesData, allPokemonData, allTypesData } = await fetchAutocompleteData();

    if (!allMovesData || !allPokemonData || !allTypesData) {
      return { notFound: true };
    }

    return {
      props: {
        allPokemon: allPokemonData,
        pokemonTypes: allTypesData,
        allMoves: allMovesData,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsHomepage;
