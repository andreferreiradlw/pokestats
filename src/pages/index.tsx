// types
import type { GetStaticProps, NextPage } from 'next';
// helpers
import { fadeInUpVariant } from '@/animations';
// components
import Seo from '@/components/Seo'; // Import the Seo component
import Homepage from '@/components/Homepage';
import { PokemonApi, TypesApi } from '@/services';
import type { NamedAPIResource } from 'pokenode-ts';
import LayoutV2 from '@/components/LayoutV2';
import Particles from '@/components/Particles';
import { Grid2 } from '@mui/material';

export interface PokestatsHomepageProps {
  pokemonTypes: NamedAPIResource[];
  pokemonList: NamedAPIResource[];
}

const PokestatsHomepage: NextPage<PokestatsHomepageProps> = props => {
  // SEO-related variables
  const pageTitle = 'Pokestats.gg - Your Complete Pokémon Encyclopedia';
  const pageDescription =
    'PokeStats.gg is your ultimate online Pokémon encyclopedia, featuring comprehensive information on Pokémon species, Pokédex entries, abilities, evolution chains, moves, stats, and more.';
  const pageKeywords =
    'Pokémon, Pokédex, Pokémon stats, Pokémon abilities, Pokémon evolutions, Pokémon moves, Pokémon types, Pokémon guide, Pokémon encyclopedia, Pokestats, Pokeapi';
  const pageImage = '/static/android-icon-512x512.png';

  return (
    <Grid2 container>
      <Seo
        title={pageTitle}
        description={pageDescription}
        image={pageImage}
        keywords={pageKeywords}
      />
      <LayoutV2
        initial="hidden"
        animate="show"
        variants={fadeInUpVariant}
        customKey="homepage-container"
      >
        <Homepage {...props} />
      </LayoutV2>
      <Particles />
    </Grid2>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // fetch data
    const [typesResponse, pokemonList] = await Promise.all([
      TypesApi.getAll(),
      PokemonApi.listPokemons(0, 905).then(({ results }) => results),
    ]);

    if (!typesResponse) {
      return { notFound: true };
    }

    return {
      props: {
        pokemonTypes: typesResponse,
        pokemonList,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsHomepage;
