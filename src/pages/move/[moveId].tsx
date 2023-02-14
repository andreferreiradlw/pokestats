import { useRouter } from 'next/router';
// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { MoveType, Pokemon, PokemonType } from '@/types';
// helpers
import {
  PokemonClient,
  MoveClient,
  MachineClient,
  Move,
  MoveTarget,
  ContestClient,
  SuperContestEffect,
  ContestEffect,
} from 'pokenode-ts';
import {
  capitalise,
  findEnglishName,
  formatFlavorText,
  getIdFromURL,
  listGamesByGroup,
  listMoveGroupsByGroup,
  removeDash,
  removeDuplicateMoves,
} from '@/helpers';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import MovePage from '@/components/MovePage';
import Loading from '@/components/Loading';

export interface PokestatsMovePageProps {
  autocompleteList: (Pokemon | PokemonType | MoveType)[];
  move: Move;
  moveMachines: { [key: string]: { machine: string; groups: string[][] } } | null;
  target: MoveTarget;
  superContestEffect: SuperContestEffect;
  contestEffect: ContestEffect;
}

const PokestatsMovePage: NextPage<PokestatsMovePageProps> = ({ autocompleteList, ...props }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Loading
        flexheight="100vh"
        icon="record"
        text="Learning Move"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
      />
    );
  }

  const moveName = props.move?.names
    ? findEnglishName(props.move.names)
    : capitalise(removeDash(props.move.name));
  const pageTitle = `${moveName} (${capitalise(
    props.move.type.name,
  )} Type Pokémon Move) - Pokestats.gg`;
  const pageDescription = formatFlavorText(props.move.flavor_text_entries.at(-1)?.flavor_text);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={`${moveName}, Move, Pokémon, Pokémon Move, ${capitalise(
            props.move.type.name,
          )} Type, Move, TM, HM, TR, Machines, Target, Effect, PP, Accuracy, Power`}
        />
        {/** Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>
      <Layout withHeader={{ autocompleteList: autocompleteList }}>
        <MovePage {...props} />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // clients
  const moveClient = new MoveClient();

  const moveList = await moveClient.listMoves(0, 50);

  const paths = moveList.results.map(move => {
    return {
      params: {
        moveId: move.name,
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
  const moveClient = new MoveClient();
  const machineClient = new MachineClient();
  const contestClient = new ContestClient();

  const moveName = params.moveId as string;

  try {
    // fetch data
    let moveData: Move;

    if (moveName === 'pound') {
      moveData = await moveClient.getMoveById(1);
    } else {
      moveData = await moveClient.getMoveByName(moveName);
    }
    const [
      { results: allPokemonDataResults },
      { results: allTypesDataResults },
      { results: allMovesDataResults },
    ] = await Promise.all([
      pokemonClient.listPokemons(0, 905),
      pokemonClient.listTypes(),
      moveClient.listMoves(0, 850),
    ]);

    if (!allPokemonDataResults || !allTypesDataResults || !allMovesDataResults || !moveData) {
      console.log('Failed to fetch moveData');
      return { notFound: true };
    }

    // move target data
    const targetData = await moveClient.getMoveTargetById(
      getIdFromURL(moveData.target.url, 'move-target'),
    );

    if (!targetData) {
      console.log('Failed to fetch targetData');
      return { notFound: true };
    }

    // moves machine data
    let moveMachinesData = {};

    if (moveData.machines?.length > 0) {
      for await (const { version_group, machine } of moveData.machines) {
        const currGenGroups = listMoveGroupsByGroup(version_group.name);
        // check if gen group already has a key
        if (
          currGenGroups &&
          !moveMachinesData[version_group.name] &&
          !moveMachinesData[currGenGroups[0]] &&
          version_group.name === currGenGroups[0]
        ) {
          // fetch machine data
          const currMachineData = await machineClient.getMachineById(
            getIdFromURL(machine.url, 'machine'),
          );
          // update results object
          moveMachinesData[version_group.name] = {
            machine: currMachineData.item.name.toUpperCase(),
            groups: currGenGroups.map(group => listGamesByGroup(group)),
          };
        }
      }
    } else {
      moveMachinesData = null;
    }

    // move contest data
    let superContestEffectData: SuperContestEffect;
    let contestEffectData: ContestEffect;

    if (moveData?.super_contest_effect) {
      superContestEffectData = await contestClient.getSuperContestEffectById(
        getIdFromURL(moveData.super_contest_effect.url, 'super-contest-effect'),
      );

      delete superContestEffectData.moves;
      superContestEffectData.flavor_text_entries =
        superContestEffectData.flavor_text_entries.filter(({ language }) => language.name === 'en');
    }

    if (moveData?.contest_effect) {
      contestEffectData = await contestClient.getContestEffectById(
        getIdFromURL(moveData.contest_effect.url, 'contest-effect'),
      );
    }

    // delete unnecessary data
    delete targetData.moves;
    targetData.descriptions = targetData.descriptions.filter(
      ({ language }) => language.name === 'en',
    );

    // move english flavor text
    moveData.flavor_text_entries = moveData.flavor_text_entries.filter(
      entry => entry.language.name === 'en',
    );

    return {
      props: {
        autocompleteList: [
          ...allPokemonDataResults.map((currPokemon, i) => ({
            ...currPokemon,
            id: i + 1,
            assetType: 'pokemon',
          })),
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
        move: moveData,
        moveMachines: moveMachinesData,
        target: targetData,
        superContestEffect: superContestEffectData || null,
        contestEffect: contestEffectData || null,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsMovePage;
