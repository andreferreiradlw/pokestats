// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type {
  Pokemon as PokenodePokemon,
  EvolutionChain,
  PokemonSpecies,
  Ability,
  NamedAPIResource,
} from 'pokenode-ts';
// helpers
import {
  formatFlavorText,
  gameVersions,
  findEnglishName,
  getResourceId,
  formatPokemonId,
} from '@/helpers';
// components
import Seo from '@/components/Seo';
import { PokemonApi, SpeciesApi } from '@/services';
import LayoutV2 from '@/components/LayoutV2';

export interface PokestatsPokemonPageProps {
  allPokemon: NamedAPIResource[];
  pokemon: PokenodePokemon;
  abilities: Ability[];
  species: PokemonSpecies;
  evolutionData: EvolutionChain;
}

const PokestatsPokemonPage: NextPage<PokestatsPokemonPageProps> = props => {
  console.log(props);
  return (
    <>
      <Seo title="Sprites" description="" />
      <LayoutV2 withHeader showGenSelect customKey="pokemon-sprites">
        {/* <PokemonPage {...props} /> */}
      </LayoutV2>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonList = await PokemonApi.listPokemons(0, 1);
  // paths
  const paths = pokemonList.results.map(pokemon => {
    return {
      params: {
        pokemonName: pokemon.name,
      },
    };
  });

  // return static paths
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PokestatsPokemonPageProps> = async ({ params }) => {
  // get current pokemon name from url params
  const pokemonName = params?.pokemonName as string;

  try {
    // fetch data
    const [pokemonDataResults, { results: allPokemonData }] = await Promise.all([
      PokemonApi.getByName(pokemonName),
      PokemonApi.listPokemons(0, 1500),
    ]);

    const pokemonSpeciesData = await SpeciesApi.getByName(pokemonDataResults.species.name);

    return {
      props: {
        pokemonDataResults,
        allPokemonData,
        pokemonSpeciesData,
      },
    };
  } catch (error) {
    console.log(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsPokemonPage;
