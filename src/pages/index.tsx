// types
import type { GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType, MoveType } from '@/types';
// helpers
import { PokemonClient, MoveClient } from 'pokenode-ts';
import { PokestatsPageTitle } from '@/components/Head';
import { getIdFromURL, removeDuplicateMoves } from '@/helpers';
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
  const pokemonClient = new PokemonClient();
  const moveClient = new MoveClient();

  try {
    const [{ results: pokemonData }, { results: typesData }, { results: movesData }] =
      await Promise.all([
        pokemonClient.listPokemons(0, 905),
        pokemonClient.listTypes(0, 18),
        moveClient.listMoves(0, 850),
      ]);

    if (!pokemonData || !typesData) {
      return { notFound: true };
    }

    return {
      props: {
        allPokemon: pokemonData.map((pokemon, index) => {
          return { ...pokemon, id: index + 1, assetType: 'pokemon' };
        }),
        pokemonTypes: typesData.map((type, index) => {
          return { ...type, id: index + 1, assetType: 'type' };
        }),
        allMoves: removeDuplicateMoves(movesData).map((currMove, i) => ({
          ...currMove,
          id: getIdFromURL(currMove.url, 'move'),
          assetType: 'move',
        })),
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsHomepage;
