// types
import type { Move, MoveTarget, SuperContestEffect, ContestEffect } from 'pokenode-ts';
// helpers
import { ContestApi, MachineApi, MovesApi, type MoveMachinesData } from '@/services';
import { getResourceId } from '@/helpers';
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

const PokestatsMovePage = async ({ params }: { params: { moveId: string } }) => {
  const moveName = params.moveId;

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
    moveId: move.name,
  }));
}

export default PokestatsMovePage;
