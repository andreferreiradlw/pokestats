// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { Move, MoveTarget, SuperContestEffect, ContestEffect } from 'pokenode-ts';
// helpers
import { capitalize } from '@mui/material';
import {
  findEnglishName,
  formatFlavorText,
  removeDash,
  mapGeneration,
  getResourceId,
  type GameGenValue,
} from '@/helpers';
import { ContestApi, MachineApi, type MoveMachinesData, MovesApi } from '@/services';
// components
import Seo from '@/components/Seo';
import MovePage from '@/components/MovePage';
import LayoutV2 from '@/components/LayoutV2';

export interface PokestatsMovePageProps {
  move: Move;
  moveMachines: MoveMachinesData | null;
  target: MoveTarget;
  superContestEffect: SuperContestEffect | null;
  contestEffect: ContestEffect | null;
}

const PokestatsMovePage: NextPage<PokestatsMovePageProps> = props => {
  // SEO-related variables
  const moveName = findEnglishName(props.move.names) ?? capitalize(removeDash(props.move.name));
  const pageTitle = `${moveName} (${capitalize(props.move.type.name)} Type Pokémon Move)`;
  const moveFlavorText = props.move.flavor_text_entries.at(-1)?.flavor_text;
  const pageDescription = moveFlavorText
    ? formatFlavorText(moveFlavorText)
    : `${moveName} is a ${capitalize(props.move.type.name)}-type ${capitalize(
        props.move.damage_class!.name,
      )} move introduced in ${mapGeneration(props.move.generation.name as GameGenValue)}.`;
  const pageKeywords = `${moveName}, Pokémon move, ${capitalize(
    props.move.type.name,
  )} type, Pokémon ${capitalize(props.move.damage_class!.name)}, TM, HM, TR, Move effects, Move target, Power, Accuracy, PP`;

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        type="article"
        siteName="Pokestats.gg"
        authorName="Andre Ferreira"
        keywords={pageKeywords}
        image={`/static/typeIcons/${props.move.type.name.toLowerCase()}.svg`}
      />
      <LayoutV2 withHeader customKey={`move-${props.move.id}`}>
        <MovePage {...props} />
      </LayoutV2>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const moveList = await MovesApi.listMoves(0, 50);

  const paths = moveList.results.map(move => ({
    params: { moveId: move.name },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PokestatsMovePageProps> = async ({ params }) => {
  const moveName = params?.moveId as string;

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
