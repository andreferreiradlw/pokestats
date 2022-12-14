// types
import type { GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType } from '@/types';
// helpers
import { PokemonClient } from 'pokenode-ts';
// components
import Layout from '@/components/Layout';
import Homepage from '@/components/Homepage';

interface PokestatsHomepageProps {
  allPokemon: Pokemon[];
  pokemonTypes: PokemonType[];
}

const PokestatsHomepage: NextPage<PokestatsHomepageProps> = ({ allPokemon, pokemonTypes }) => (
  <Layout $withGutter={false} withFooter={true}>
    <Homepage allPokemon={allPokemon} pokemonTypes={pokemonTypes} />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const api = new PokemonClient();

  try {
    const [pokemonData, typesData] = await Promise.all([api.listPokemons(0, 809), api.listTypes()]);

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
