import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MoveClient, Move, MoveTarget, SuperContestEffect, ContestEffect } from 'pokenode-ts';
import {
  capitalise,
  findEnglishName,
  formatFlavorText,
  removeDash,
  mapGeneration,
  getResourceId,
} from '@/helpers';
import Head from 'next/head';
import Layout from '@/components/Layout';
import MovePage from '@/components/MovePage';
import Loading from '@/components/Loading';
import { ContestApi, MachineApi, type MoveMachinesData, MovesApi } from '@/services';

export interface PokestatsMovePageProps {
  move: Move;
  moveMachines: MoveMachinesData;
  target: MoveTarget;
  superContestEffect: SuperContestEffect;
  contestEffect: ContestEffect;
}

const PokestatsMovePage: NextPage<PokestatsMovePageProps> = props => {
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

  const moveName = findEnglishName(props.move.names) ?? capitalise(removeDash(props.move.name));
  const pageTitle = `${moveName} (${capitalise(props.move.type.name)} Type Pokémon Move) - Pokestats.gg`;
  const moveFlavorText = props.move.flavor_text_entries.at(-1)?.flavor_text;
  const pageDescription = moveFlavorText
    ? formatFlavorText(moveFlavorText)
    : `${moveName} is a ${capitalise(props.move.type.name)}-type ${capitalise(
        props.move.damage_class.name,
      )} move introduced in ${mapGeneration(props.move.generation.name)}`;

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
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>
      <Layout withHeader>
        <MovePage {...props} />
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const moveClient = new MoveClient();
  const moveList = await moveClient.listMoves(0, 50);

  const paths = moveList.results.map(move => ({
    params: { moveId: move.name },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const moveName = params.moveId as string;

  try {
    const [moveData, allMovesData] = await Promise.all([
      MovesApi.getMoveData(moveName),
      MovesApi.listMoves(0, 850),
    ]);

    if (!allMovesData || !moveData) {
      return { notFound: true };
    }

    const [targetData, moveMachinesData, { superContestEffectData, contestEffectData }] =
      await Promise.all([
        MovesApi.getMoveTarget(getResourceId(moveData.target.url)),
        MachineApi.getMoveMachinesData(moveData.machines),
        ContestApi.getMoveContestEffects(moveData),
      ]);

    return {
      props: {
        move: moveData,
        moveMachines: moveMachinesData,
        target: targetData,
        superContestEffect: superContestEffectData,
        contestEffect: contestEffectData,
      },
    };
  } catch (error) {
    console.error('Error fetching move data:', error);
    return { notFound: true };
  }
};

export default PokestatsMovePage;
