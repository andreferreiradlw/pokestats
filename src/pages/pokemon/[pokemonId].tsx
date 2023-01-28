import { useRouter } from 'next/router';
// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType, PokemonMove, MoveType } from '@/types';
import type {
  Pokemon as PokenodePokemon,
  EvolutionChain,
  PokemonSpecies,
  Ability,
  EvolutionDetail,
} from 'pokenode-ts';
// helpers
import { PokemonClient, EvolutionClient, MoveClient } from 'pokenode-ts';
import {
  getIdFromEvolutionChain,
  getIdFromSpecies,
  prefixId,
  formatFlavorText,
  gameVersions,
  findEnglishName,
  removeDuplicateMoves,
  getIdFromURL,
} from '@/helpers';
import { PokestatsPageTitle } from '@/components/Head';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import PokemonPage from '@/components/Pokemon';
import Loading from '@/components/Loading';

export interface PokestatsPokemonPageProps {
  allPokemon: Pokemon[];
  autocompleteList: (PokemonType | MoveType)[];
  pokemon: PokenodePokemon;
  abilities: Ability[];
  species: PokemonSpecies;
  pokemonMoves: PokemonMove[];
  evolutionChain: {
    chainId: number;
    babyTriggerItem: EvolutionChain['baby_trigger_item'];
    firstEvolution: PokemonSpecies;
    secondEvolution: {
      species: PokemonSpecies;
      evolutionDetails: EvolutionDetail[];
      thirdEvolution: {
        species: PokemonSpecies;
        evolutionDetails: EvolutionDetail[];
      }[];
    }[];
  };
}

const PokestatsPokemonPage: NextPage<PokestatsPokemonPageProps> = ({
  autocompleteList,
  allPokemon,
  ...props
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Loading
        flexheight="100vh"
        icon="pokeball"
        text="Catching Pokémon"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
      />
    );
  }

  const pokemonName = findEnglishName(props.species.names);
  const pageTitle = `${pokemonName} (Pokémon #${props.pokemon.id}) - ${PokestatsPageTitle}`;
  const pageDescription = formatFlavorText(props.species.flavor_text_entries.at(-1)?.flavor_text);
  const generationDescriptions = gameVersions
    .filter(version => version.genValue === props.species.generation.name)
    .map(game => game.label)
    .join(', ');

  return (
    <>
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
      <Layout
        withHeader={{
          autocompleteList: [...allPokemon, ...autocompleteList],
          currPokemon: props.species,
        }}
      >
        <PokemonPage allPokemon={allPokemon} {...props} />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const api = new PokemonClient();

  const pokemonList = await api.listPokemons(0, 250);
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
  // clients
  const pokemonClient = new PokemonClient();
  const evolutionClient = new EvolutionClient();
  const moveClient = new MoveClient();

  const pokemonName = params.pokemonId as string;

  try {
    // fetch data
    const [
      { results: allPokemonDataResults },
      { results: allTypesDataResults },
      pokemonDataResults,
      { results: allMovesDataResults },
    ] = await Promise.all([
      pokemonClient.listPokemons(0, 905),
      pokemonClient.listTypes(),
      pokemonClient.getPokemonByName(pokemonName),
      moveClient.listMoves(0, 850),
    ]);

    if (
      !allPokemonDataResults ||
      !allTypesDataResults ||
      !allMovesDataResults ||
      !pokemonDataResults
    ) {
      console.log('Failed to fetch allPokemonData, typesData, pokemonData');
      return { notFound: true };
    }

    if (pokemonDataResults.id > 905) return { notFound: true };

    // abilities requests array
    let pokemonAbilities = [];
    // create an axios request for each ability
    pokemonDataResults.abilities.forEach(({ ability }) =>
      pokemonAbilities.push(pokemonClient.getAbilityByName(ability.name)),
    );

    const pokemonAbilitiesResults = await Promise.all(pokemonAbilities);

    // get evolution chain id from url
    const pokemonSpeciesResults = await pokemonClient.getPokemonSpeciesById(
      getIdFromSpecies(pokemonDataResults.species.url),
    );

    if (!pokemonSpeciesResults || !pokemonAbilitiesResults) {
      console.log('Failed to fetch pokemonSpeciesResults or pokemonAbilitiesResults');
      return { notFound: true };
    }

    // get evolution chain id from url
    const evolutionDataResults = await evolutionClient.getEvolutionChainById(
      getIdFromEvolutionChain(pokemonSpeciesResults.evolution_chain.url),
    );

    if (!evolutionDataResults) {
      console.log('Failed to fetch evolutionData');
      return { notFound: true };
    }

    // get evolution data based on chain
    let evolutionChainPokemon = {
      chainId: evolutionDataResults.id,
      babyTriggerItem: evolutionDataResults.baby_trigger_item,
      firstEvolution: null,
      secondEvolution: [],
    };

    // first evolution
    if (evolutionDataResults.chain.species.name === pokemonName) {
      evolutionChainPokemon.firstEvolution = pokemonSpeciesResults;
    } else {
      const firstEvoData = await pokemonClient.getPokemonSpeciesByName(
        evolutionDataResults.chain.species.name,
      );
      evolutionChainPokemon.firstEvolution = firstEvoData;
    }

    for (const [i, second_evolution] of evolutionDataResults.chain.evolves_to.entries()) {
      // second evolution
      if (second_evolution.species.name === pokemonName) {
        evolutionChainPokemon.secondEvolution.push({
          species: pokemonSpeciesResults,
          evolutionDetails: second_evolution.evolution_details,
          thirdEvolution: [],
        });
      } else {
        const secondEvoData = await pokemonClient.getPokemonSpeciesByName(
          second_evolution.species.name,
        );
        if (secondEvoData.id <= 905) {
          evolutionChainPokemon.secondEvolution.push({
            species: secondEvoData,
            evolutionDetails: second_evolution.evolution_details,
            thirdEvolution: [],
          });
        }
      }
      // third evolution
      for (const third_evolution of second_evolution.evolves_to) {
        if (third_evolution.species.name === pokemonName) {
          evolutionChainPokemon.secondEvolution[i].thirdEvolution.push({
            species: pokemonSpeciesResults,
            evolutionDetails: third_evolution.evolution_details,
          });
        } else {
          const thirdEvoData = await pokemonClient.getPokemonSpeciesByName(
            third_evolution.species.name,
          );
          if (thirdEvoData.id <= 905) {
            evolutionChainPokemon.secondEvolution[i].thirdEvolution.push({
              species: thirdEvoData,
              evolutionDetails: third_evolution.evolution_details,
            });
          }
        }
      }
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
        allPokemon: allPokemonDataResults.map((currPokemon, i) => ({
          ...currPokemon,
          id: i + 1,
          assetType: 'pokemon',
        })),
        autocompleteList: [
          ...allTypesDataResults.map((currType, i) => ({
            ...currType,
            id: i + 1,
            assetType: 'type',
          })),
          ...removeDuplicateMoves(allMovesDataResults).map((currMove, i) => ({
            ...currMove,
            id: getIdFromURL(currMove.url, 'move'),
            assetType: 'move',
          })),
        ],
        pokemon: pokemonDataResults,
        abilities: pokemonAbilitiesResults.map(ability => ({
          name: ability.name,
          effect_entries: ability.effect_entries.filter(entry => entry.language.name === 'en'),
        })),
        species: pokemonSpeciesResults,
        evolutionChain: evolutionChainPokemon,
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
