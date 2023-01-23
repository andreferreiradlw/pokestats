import { useRouter } from 'next/router';
// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Pokemon, PokemonType } from '@/types';
// helpers
import {
  PokemonClient,
  MoveClient,
  Move,
  MoveTarget,
  ContestClient,
  SuperContestEffect,
  ContestEffect,
} from 'pokenode-ts';
import { capitalise, findEnglishName, getIdFromURL, removeDash } from '@/helpers';
import { PokestatsPageTitle } from '@/components/Head';
// components
import Head from 'next/head';
import Layout from '@/components/Layout';
import MovePage from '@/components/MovePage';
import Loading from '@/components/Loading';

export interface PokestatsMovePageProps {
  autocompleteList: (Pokemon | PokemonType)[];
  move: Move;
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
        text="Learning Move"
        $iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
      />
    );
  }

  const moveName = props.move?.names
    ? findEnglishName(props.move.names)
    : capitalise(removeDash(props.move.name));
  const pageTitle = `${moveName} (Pokémon Move) - ${PokestatsPageTitle}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
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
  const pokemonClient = new PokemonClient();
  const moveClient = new MoveClient();
  const contestClient = new ContestClient();

  const moveName = params.moveId as string;

  try {
    // fetch data
    const [{ results: allPokemonDataResults }, { results: allTypesDataResults }, moveData] =
      await Promise.all([
        pokemonClient.listPokemons(0, 905),
        pokemonClient.listTypes(),
        moveClient.getMoveByName(moveName),
      ]);

    if (!allPokemonDataResults || !allTypesDataResults || !moveData) {
      console.log('Failed to fetch moveData');
      return { notFound: true };
    }

    console.log(moveData);

    // fetch target and contest move data
    const [targetData, superContestEffectData, contestEffectData] = await Promise.all([
      moveClient.getMoveTargetById(getIdFromURL(moveData.target.url, 'move-target')),
      contestClient.getSuperContestEffectById(
        getIdFromURL(moveData.super_contest_effect.url, 'super-contest-effect'),
      ),
      contestClient.getContestEffectById(
        getIdFromURL(moveData.contest_effect.url, 'contest-effect'),
      ),
    ]);

    if (!targetData || !superContestEffectData || !contestEffectData) {
      console.log('Failed to fetch targetData');
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
        ],
        move: moveData,
        target: targetData,
        superContestEffect: superContestEffectData,
        contestEffect: contestEffectData,
      },
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default PokestatsMovePage;
