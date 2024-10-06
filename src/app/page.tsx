// types
import type { NamedAPIResource } from 'pokenode-ts';
// helpers
import { fadeInUpVariant } from '@/animations';
import { PokemonApi, TypesApi } from '@/services';
// components
import { Grid2 } from '@mui/material';
import LayoutV2 from '@/components/LayoutV2';
import { Homepage } from '@/PageComponents';
import Particles from '@/components/Particles';

export interface PokestatsHomepageProps {
  pokemonTypes: NamedAPIResource[];
  pokemonList: NamedAPIResource[];
}

const fetchPokestatsData = async (): Promise<PokestatsHomepageProps> => {
  const [typesResponse, { results: pokemonList }] = await Promise.all([
    TypesApi.getAll(),
    PokemonApi.listPokemons(0, 1024),
  ]);

  return {
    pokemonTypes: typesResponse,
    pokemonList,
  };
};

export default async function PokestatsHomepage() {
  const props = await fetchPokestatsData();

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
}
