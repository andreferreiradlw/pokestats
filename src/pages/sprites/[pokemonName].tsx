// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, NamedAPIResource } from 'pokenode-ts';
// helpers
import { PokemonApi, SpeciesApi } from '@/services';
// components
import Seo from '@/components/Seo';
import LayoutV2 from '@/components/LayoutV2';
import SpritesPage from '@/components/SpritesPage';

export interface PokestatsSpritePageProps {
  pokemon: Pokemon;
  allPokemonData: NamedAPIResource[];
  otherFormsData: Pokemon[] | null;
}

const PokestatsSpritePage: NextPage<PokestatsSpritePageProps> = props => {
  return (
    <>
      <Seo title="Pokemon Sprites" description="" />
      <LayoutV2 withHeader customKey={`pokemon-sprites-${props.pokemon.name}`}>
        <SpritesPage {...props} />
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
    fallback: false,
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

    const otherForms = pokemonSpeciesData.varieties
      .filter(({ is_default }) => !is_default)
      .map(({ pokemon }) => PokemonApi.getByName(pokemon.name));

    let otherFormsData: Pokemon[] | null = null;

    if (otherForms.length > 0) otherFormsData = await Promise.all(otherForms);

    return {
      props: {
        pokemon: pokemonData,
        allPokemonData,
        otherFormsData,
      },
    };
  } catch (error) {
    console.log(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsSpritePage;
