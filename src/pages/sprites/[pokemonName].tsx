// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonSpecies, NamedAPIResource } from 'pokenode-ts';
// helpers
import { formatSpriteData } from '@/helpers';
import { PokemonApi, SpeciesApi } from '@/services';
// components
import Seo from '@/components/Seo';
import LayoutV2 from '@/components/LayoutV2';

export interface PokestatsSpritePageProps {
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
  allPokemonData: NamedAPIResource[];
}

const PokestatsSpritePage: NextPage<PokestatsSpritePageProps> = props => {
  console.log(props, formatSpriteData(props.pokemon.sprites, props.pokemonSpecies.varieties));
  return (
    <>
      <Seo title="Pokemon Sprites" description="" />
      <LayoutV2 withHeader showGenSelect customKey="pokemon-sprites">
        {/* <PokemonPage {...props} /> */}
      </LayoutV2>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonList = await PokemonApi.listPokemons(0, 1302);
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

export const getStaticProps: GetStaticProps<PokestatsSpritePageProps> = async ({ params }) => {
  // get current pokemon name from url params
  const pokemonName = params?.pokemonName as string;

  try {
    // fetch data
    const [pokemonData, { results: allPokemonData }] = await Promise.all([
      PokemonApi.getByName(pokemonName),
      PokemonApi.listPokemons(0, 1302),
    ]);

    const pokemonSpeciesData = await SpeciesApi.getByName(pokemonData.species.name);

    return {
      props: {
        pokemon: pokemonData,
        allPokemonData,
        pokemonSpecies: pokemonSpeciesData,
      },
    };
  } catch (error) {
    console.log(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsSpritePage;
