// types
import type { GetStaticProps, NextPage } from 'next';
// helpers
import { fadeInUpVariant } from '@/animations';
// components
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
  return (
    <Grid2 container>
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
    const [typesResponse, { results: pokemonList }] = await Promise.all([
      TypesApi.getAll(),
      PokemonApi.listPokemons(0, 1024),
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
