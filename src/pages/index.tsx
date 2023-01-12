// types
import type { GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType } from '@/types';
// helpers
import { PokemonClient } from 'pokenode-ts';
import { PokestatsPageTitle } from '@/components/Head';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import Homepage from '@/components/Homepage';

interface PokestatsHomepageProps {
  allPokemon: Pokemon[];
  pokemonTypes: PokemonType[];
}

const PokestatsHomepage: NextPage<PokestatsHomepageProps> = ({ allPokemon, pokemonTypes }) => (
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
      <Homepage allPokemon={allPokemon} pokemonTypes={pokemonTypes} />
    </Layout>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const api = new PokemonClient();

  try {
    const [pokemonData, typesData] = await Promise.all([
      api.listPokemons(0, 809),
      api.listTypes(0, 18),
    ]);

    if (!pokemonData || !typesData) {
      return { notFound: true };
    }

    return {
      props: {
        allPokemon: pokemonData.results.map((pokemon, index) => {
          return { ...pokemon, id: index + 1, assetType: 'pokemon' };
        }),
        pokemonTypes: typesData.results.map((type, index) => {
          return { ...type, id: index + 1, assetType: 'type' };
        }),
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsHomepage;
