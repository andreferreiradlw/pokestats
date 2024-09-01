import { useRouter } from 'next/router';
// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType, PokemonMove, MoveType } from '@/types';
import type {
  Pokemon as PokenodePokemon,
  EvolutionChain,
  PokemonSpecies,
  Ability,
} from 'pokenode-ts';
// helpers
import {
  prefixId,
  formatFlavorText,
  gameVersions,
  findEnglishName,
  getResourceId,
} from '@/helpers';
// components
import Head from 'next/head';
import PokemonPage from '@/components/Pokemon';
import Loading from '@/components/Loading';
import { AbilityApi, EvolutionApi, PokemonApi, SpeciesApi } from '@/services';
import LayoutV2 from '@/components/LayoutV2';
import { GameVersionProvider } from '@/context';

export interface PokestatsPokemonPageProps {
  allPokemon: Pokemon[];
  autocompleteList: (PokemonType | MoveType)[];
  pokemon: PokenodePokemon;
  abilities: Ability[];
  species: PokemonSpecies;
  pokemonMoves: PokemonMove[];
  evolutionData: EvolutionChain;
}

const PokestatsPokemonPage: NextPage<PokestatsPokemonPageProps> = ({ allPokemon, ...props }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Loading
        height="100vh"
        icon="pokeball"
        text="Catching Pokémon"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
      />
    );
  }

  const pokemonName = findEnglishName(props.species.names);
  const pageTitle = `${pokemonName} (Pokémon #${props.pokemon.id}) - Pokestats.gg`;
  const pageDescription = formatFlavorText(props.species.flavor_text_entries!.at(-1)?.flavor_text);
  const generationDescriptions = gameVersions
    .filter(version => version.genValue === props.species.generation.name)
    .map(game => game.label)
    .join(', ');

  return (
    <GameVersionProvider pokemon={props.species}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${pokemonName}, ${pokemonName} gg, Pokemon, Pokémon, Pokédex, Pokestats, Pokestats gg, ${pokemonName} Shiny, ${generationDescriptions}`}
        />
        {/** Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${prefixId(
            props.pokemon.id,
          )}.png`}
        />
      </Head>
      <LayoutV2 withHeader showGenSelect key={`pokemon-${props.species.id}`}>
        <PokemonPage allPokemon={allPokemon} {...props} />
      </LayoutV2>
    </GameVersionProvider>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonList = await PokemonApi.listPokemons(0, 250);
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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // get current pokemon name from url params
  const pokemonName = params?.pokemonId as string;

  try {
    // fetch data
    const [pokemonDataResults, { results: allPokemonData }] = await Promise.all([
      PokemonApi.getByName(pokemonName),
      PokemonApi.listPokemons(0, 905),
    ]);

    if (!allPokemonData || !pokemonDataResults) {
      console.log('Failed to fetch allPokemonData, typesData, pokemonData');
      return { notFound: true };
    }

    if (pokemonDataResults.id > 905) return { notFound: true };

    const pokemonAbilitiesResults = await AbilityApi.getPokemonAbilities(pokemonDataResults);

    // get evolution chain id from url
    const pokemonSpeciesResults = await SpeciesApi.getById(
      getResourceId(pokemonDataResults.species.url),
    );

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
        abilities: pokemonAbilitiesResults.map(ability => ({
          name: ability.name,
          effect_entries: ability.effect_entries.filter(entry => entry.language.name === 'en'),
        })),
        species: pokemonSpeciesResults,
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
