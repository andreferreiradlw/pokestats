import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// helpers
import { useRouter } from 'next/router';
import { MoveClient, Move, MoveTarget, ContestClient, SuperContestEffect } from 'pokenode-ts';
import { getIdFromURL } from '@/helpers';
import { PokestatsPageTitle } from '@/components/Head';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
// import MovePage from '@/components/Move';
import Loading from '@/components/Loading';

export interface PokestatsMovePageProps {
  move: Move;
  target: MoveTarget;
  superContestEffect: SuperContestEffect;
}

const PokestatsMovePage: NextPage<PokestatsMovePageProps> = ({
  move,
  target,
  superContestEffect,
  ...props
}) => {
  console.log(move, target, superContestEffect, props);

  const router = useRouter();

  if (router.isFallback) {
    return (
      <Loading
        height="100vh"
        text="Loading Move"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
      />
    );
  }

  return <div>Move Page</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // clients
  const moveClient = new MoveClient();

  const moveList = await moveClient.listMoves(0, 150);

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
  const moveClient = new MoveClient();
  const contestClient = new ContestClient();

  const moveName = params.moveId as string;

  try {
    // get move data from param
    const moveData = await moveClient.getMoveByName(moveName);

    if (!moveData) {
      console.error('Failed to fetch moveData');
      return { notFound: true };
    }

    // fetch data
    const [targetData, superContestEffectData] = await Promise.all([
      moveClient.getMoveTargetById(getIdFromURL(moveData.target.url, 'move-target')),
      contestClient.getSuperContestEffectById(
        getIdFromURL(moveData.super_contest_effect.url, 'super-contest-effect'),
      ),
    ]);

    if (!targetData || !superContestEffectData) {
      console.error('Failed to fetch targetData');
      return { notFound: true };
    }

    // delete unnecessary data
    delete targetData.moves;
    targetData.descriptions = targetData.descriptions.filter(
      ({ language }) => language.name === 'en',
    );
    delete superContestEffectData.moves;
    superContestEffectData.flavor_text_entries = superContestEffectData.flavor_text_entries.filter(
      ({ language }) => language.name === 'en',
    );

    return {
      props: {
        move: moveData,
        target: targetData,
        superContestEffect: superContestEffectData,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsMovePage;
