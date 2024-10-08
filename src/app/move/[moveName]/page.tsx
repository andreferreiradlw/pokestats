// types
import type { Move, MoveTarget, SuperContestEffect, ContestEffect } from 'pokenode-ts';
import type { Metadata } from 'next';
// helpers
import { ContestApi, MachineApi, MovesApi, type MoveMachinesData } from '@/services';
import {
  capitalise,
  findEnglishMoveFlavorText,
  findEnglishName,
  formatFlavorText,
  type GameGenValue,
  getResourceId,
  listGamesByGeneration,
  mapGeneration,
  removeDash,
} from '@/helpers';
import { notFound } from 'next/navigation';
// components
import { MovePage } from '@/PageComponents';

export interface PokestatsMovePageProps {
  move: Move;
  moveMachines: MoveMachinesData | null;
  target: MoveTarget;
  superContestEffect: SuperContestEffect | null;
  contestEffect: ContestEffect | null;
}

interface MovePageParams {
  params: { moveName: string };
}

export async function generateMetadata({
  params: { moveName },
}: MovePageParams): Promise<Metadata> {
  const { names, name, type, flavor_text_entries, damage_class, generation } =
    await MovesApi.getMoveData(moveName);

  const baseName = removeDash(name);
  const moveEnglishName = findEnglishName(names) ?? capitalise(baseName);
  const pageTitle = `${moveEnglishName} - ${capitalise(type.name)} Type Pokémon Move`;
  const moveFlavorText = findEnglishMoveFlavorText(flavor_text_entries);
  const pageDescription = moveFlavorText
    ? formatFlavorText(moveFlavorText)
    : `${moveEnglishName} is a ${capitalise(type.name)}-type ${capitalise(
        damage_class!.name,
      )} move introduced in ${mapGeneration(generation.name as GameGenValue)}.`;

  const games = listGamesByGeneration(generation.name as GameGenValue).map(
    game => `${baseName} ${game}`,
  );

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      baseName,
      name,
      `${baseName} pokemon`,
      `pokemon with ${baseName}`,
      `${baseName} move`,
      `${baseName} move pokemon`,
      `${baseName} gg`,
      `is ${baseName} a good move`,
      ...games,
    ],
    openGraph: {
      images: [
        {
          url: `https://raw.githubusercontent.com/msikma/pokesprite/master/items/tm/${type.name}.png`,
        },
      ],
    },
  };
}

const PokestatsMovePage = async ({ params: { moveName } }: MovePageParams) => {
  try {
    const moveData = await MovesApi.getMoveData(moveName);

    if (!moveData) {
      notFound();
    }

    const [targetData, moveMachinesData, { superContestEffectData, contestEffectData }] =
      await Promise.all([
        MovesApi.getMoveTarget(getResourceId(moveData.target.url)),
        MachineApi.getMoveMachinesData(moveData.machines),
        ContestApi.getMoveContestEffects(moveData),
      ]);

    const props: PokestatsMovePageProps = {
      move: moveData,
      moveMachines: moveMachinesData,
      target: targetData,
      superContestEffect: superContestEffectData,
      contestEffect: contestEffectData,
    };

    return <MovePage {...props} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export async function generateStaticParams() {
  const moveList = await MovesApi.listMoves(0, 937);

  return moveList.results.map(move => ({
    moveName: move.name,
  }));
}

export default PokestatsMovePage;
