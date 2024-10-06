// types
import type { NamedAPIResource } from 'pokenode-ts';
// helpers
import { fadeInUpVariant } from '@/animations';
import { PokemonApi, TypesApi } from '@/services';
// components
import { Homepage } from '@/PageComponents';
import Particles from '@/components/Particles';
import { Grid2 } from '@mui/material';
import LayoutV2 from '@/components/LayoutV2';

export interface PokestatsHomepageProps {
  pokemonTypes: NamedAPIResource[];
  pokemonList: NamedAPIResource[];
}

export const fetchPokestatsData = async () => {
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
      pokemonTypes: typesResponse,
      pokemonList,
    };
  } catch (error) {
    console.error(error);
    // handle the error appropriately here
    throw new Error('Data fetching failed');
  }
};

export default async function PokestatsHomepage() {
  const { pokemonList, pokemonTypes } = await fetchPokestatsData();

  return (
    <Grid2 container>
      <LayoutV2
        initial="hidden"
        animate="show"
        variants={fadeInUpVariant}
        customKey="homepage-container"
      >
        <Homepage pokemonList={pokemonList} pokemonTypes={pokemonTypes} />
      </LayoutV2>
      <Particles />
    </Grid2>
  );
}
