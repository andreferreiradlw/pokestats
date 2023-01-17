import { useRouter } from 'next/router';
// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType, PokemonMove } from '@/types';
import type {
  Pokemon as PokenodePokemon,
  EvolutionChain,
  PokemonSpecies,
  VersionGroup,
  Ability,
  EvolutionDetail,
} from 'pokenode-ts';
// helpers
import { PokemonClient, EvolutionClient } from 'pokenode-ts';
import {
  getIdFromEvolutionChain,
  getIdFromSpecies,
  mapGenerationToGame,
  removeDash,
  formatFlavorText,
  gameVersions,
  findPokemonName,
} from '@/helpers';
import { PokestatsPageTitle } from '@/components/Head';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import PokemonPage from '@/components/Pokemon';
import Loading from '@/components/Loading';

export interface PokestatsPokemonPageProps {
  allPokemon: Pokemon[];
  allPokemonTypes: PokemonType[];
  pokemon: PokenodePokemon;
  abilities: Ability[];
  species: PokemonSpecies;
  pokemonMoves: PokemonMove[];
  pokemonGen: VersionGroup['name'];
  evolutionChain: {
    chainId: number;
    babyTriggerItem: EvolutionChain['baby_trigger_item'];
    firstEvolution: PokemonSpecies;
    secondEvolution: {
      species: PokemonSpecies;
      evolutionDetails: EvolutionDetail[];
    }[];
    thirdEvolution: {
      species: PokemonSpecies;
      evolutionDetails: EvolutionDetail[];
    }[];
  };
}

const PokestatsPokemonPage: NextPage<PokestatsPokemonPageProps> = ({
  allPokemonTypes,
  allPokemon,
  pokemonGen,
  ...props
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Loading
        flexheight="100vh"
        text="Loading Pokemon"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
      />
    );
  }

  const pokemonName = findPokemonName(props.species);
  const pageTitle = `${pokemonName} (Pokémon) - ${PokestatsPageTitle}`;
  const pageDescription = formatFlavorText(props.species.flavor_text_entries[0]?.flavor_text);
  const generationDescriptions = gameVersions
    .filter(version => version.genValue === props.species.generation.name)
    .map(game => game.name)
    .join(', ');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${pokemonName}, Pokemon, Pokémon, Pokédex, Pokestats, ${generationDescriptions}`}
        />
        {/** Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${props.pokemon.id
            .toString()
            .padStart(3, '0')}.png`}
        />
      </Head>
      <Layout
        withHeader={{
          autocompleteList: [].concat(allPokemon, allPokemonTypes),
          pokemonGen: pokemonGen,
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

  const pokemonName = params.pokemonId as string;

  try {
    // fetch data
    const [
      { results: allPokemonDataResults },
      { results: allTypesDataResults },
      pokemonDataResults,
    ] = await Promise.all([
      pokemonClient.listPokemons(0, 809),
      pokemonClient.listTypes(),
      pokemonClient.getPokemonByName(pokemonName),
    ]);

    if (!allPokemonDataResults || !allTypesDataResults || !pokemonDataResults) {
      console.error('Failed to fetch allPokemonData, typesData, pokemonData');
      return { notFound: true };
    }

    if (pokemonDataResults.id > 809) return { notFound: true };

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
      console.error('Failed to fetch pokemonSpeciesResults or pokemonAbilitiesResults');
      return { notFound: true };
    }

    // get evolution chain id from url
    const evolutionDataResults = await evolutionClient.getEvolutionChainById(
      getIdFromEvolutionChain(pokemonSpeciesResults.evolution_chain.url),
    );

    if (!evolutionDataResults) {
      console.error('Failed to fetch evolutionData');
      return { notFound: true };
    }

    // get evolution data based on chain
    let evolutionChainPokemon = {
      chainId: evolutionDataResults.id,
      babyTriggerItem: evolutionDataResults.baby_trigger_item,
      firstEvolution: null,
      secondEvolution: [],
      thirdEvolution: [],
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

    for (const second_evolution of evolutionDataResults.chain.evolves_to) {
      // second evolution
      if (second_evolution.species.name === pokemonName) {
        evolutionChainPokemon.secondEvolution.push({
          species: pokemonSpeciesResults,
          evolutionDetails: second_evolution.evolution_details,
        });
      } else {
        const secondEvoData = await pokemonClient.getPokemonSpeciesByName(
          second_evolution.species.name,
        );
        evolutionChainPokemon.secondEvolution.push({
          species: secondEvoData,
          evolutionDetails: second_evolution.evolution_details,
        });
      }
      // third evolution
      for (const third_evolution of second_evolution.evolves_to) {
        if (third_evolution.species.name === pokemonName) {
          evolutionChainPokemon.thirdEvolution.push({
            species: pokemonSpeciesResults,
            evolutionDetails: third_evolution.evolution_details,
          });
        } else {
          const thirdEvoData = await pokemonClient.getPokemonSpeciesByName(
            third_evolution.species.name,
          );
          evolutionChainPokemon.thirdEvolution.push({
            species: thirdEvoData,
            evolutionDetails: third_evolution.evolution_details,
          });
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

    const { game_indices } = pokemonDataResults;
    const { generation } = pokemonSpeciesResults;
    const pokemonGen = game_indices?.[0]
      ? game_indices[0].version.name
      : mapGenerationToGame(generation.name);

    return {
      props: {
        allPokemon: allPokemonDataResults.map((currPokemon, i) => ({
          ...currPokemon,
          id: i + 1,
          assetType: 'pokemon',
        })),
        allPokemonTypes: allTypesDataResults.map((currType, i) => ({
          ...currType,
          id: i + 1,
          assetType: 'type',
        })),
        pokemon: pokemonDataResults,
        abilities: pokemonAbilitiesResults.map(ability => ({
          name: ability.name,
          effect_entries: ability.effect_entries.filter(entry => entry.language.name === 'en'),
        })),
        species: pokemonSpeciesResults,
        evolutionChain: evolutionChainPokemon,
        pokemonGen,
        revalidate: 120,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsPokemonPage;
