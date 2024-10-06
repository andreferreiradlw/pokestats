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
import PokemonPage from '@/components/Pokemon';
import { AbilityApi, EvolutionApi, PokemonApi, SpeciesApi } from '@/services';
import LayoutV2 from '@/components/LayoutV2';

export interface PokestatsPokemonPageProps {
  allPokemon: NamedAPIResource[];
  pokemon: PokenodePokemon;
  abilities: Ability[];
  species: PokemonSpecies;
  evolutionData: EvolutionChain;
}

const PokestatsPokemonPage: NextPage<PokestatsPokemonPageProps> = props => {
  // SEO-related variables
  const pokemonName = findEnglishName(props.species.names);
  const pageTitle = `${pokemonName} (Pokémon #${props.pokemon.id})`;
  const pageDescription = formatFlavorText(props.species.flavor_text_entries!.at(-1)?.flavor_text);
  const generationDescriptions = gameVersions
    .filter(version => version.genValue === props.species.generation.name)
    .map(game => game.label)
    .join(', ');
  const pageImage = `https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(
    props.pokemon.id,
  )}.png`;
  const pageKeywords = `${pokemonName}, ${pokemonName} gg, Pokemon, Pokémon, Pokédex, Pokestats, Pokestats gg, ${pokemonName} Shiny, ${generationDescriptions}`;

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        image={pageImage}
        keywords={pageKeywords}
      />
      <LayoutV2 withHeader showGenSelect customKey={`pokemon-${props.species.id}`}>
        <PokemonPage {...props} />
      </LayoutV2>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonList = await PokemonApi.listPokemons(0, 1024);
  // paths
  const paths = pokemonList.results.map(pokemon => {
    return {
      params: {
        pokemonId: pokemon.name,
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
  const pokemonName = params?.pokemonId as string;

  try {
    // fetch data
    const [pokemonDataResults, { results: allPokemonData }] = await Promise.all([
      PokemonApi.getByName(pokemonName),
      PokemonApi.listPokemons(0, 1024),
    ]);

    if (!allPokemonData || !pokemonDataResults) {
      console.log('Failed to fetch allPokemonData, typesData, pokemonData');
      return { notFound: true };
    }

    const [pokemonAbilitiesResults, pokemonSpeciesResults] = await Promise.all([
      AbilityApi.getPokemonAbilities(pokemonDataResults),
      SpeciesApi.getByName(pokemonDataResults.species.name),
    ]);

    if (!pokemonSpeciesResults || !pokemonAbilitiesResults) {
      console.log('Failed to fetch pokemonSpeciesResults or pokemonAbilitiesResults');
      return { notFound: true };
    }

    // get evolution chain id from url
    const evolutionDataResults = await EvolutionApi.getById(
      getResourceId(pokemonSpeciesResults.evolution_chain.url),
    );

    if (!evolutionDataResults) {
      console.log('Failed to fetch evolutionData');
      return { notFound: true };
    }

    // species english flavor text
    pokemonSpeciesResults.flavor_text_entries = pokemonSpeciesResults.flavor_text_entries.filter(
      entry => entry.language.name === 'en',
    );
    // species english genus
    pokemonSpeciesResults.genera = pokemonSpeciesResults.genera.filter(
      entry => entry.language.name === 'en',
    );

    return {
      props: {
        allPokemon: allPokemonData,
        pokemon: pokemonDataResults,
        species: pokemonSpeciesResults,
        abilities: pokemonAbilitiesResults.map(ability => ({
          name: ability.name,
          effect_entries: ability.effect_entries.filter(entry => entry.language.name === 'en'),
        })) as Ability[],
        evolutionData: evolutionDataResults,
        revalidate: 120,
      },
    };
  } catch (error) {
    console.log(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsPokemonPage;
