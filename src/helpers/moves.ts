import type { MoveLearnMethod, Machine, NamedAPIResource } from 'pokenode-ts';
import type { PokemonMove } from '@/types';
import { MachineClient } from 'pokenode-ts';
import { getIdFromMachine } from '@/helpers';

export interface FilteredMove extends PokemonMove {
  level_learned_at: number;
  current_version_machine?: string;
}

const filterMoves = (
  moves: PokemonMove[],
  learnMethod: MoveLearnMethod['name'],
  versionGroup: string,
): FilteredMove[] => {
  return moves
    .filter(move =>
      move.version_group_details.some(
        group =>
          group.version_group.name === versionGroup && group.move_learn_method.name === learnMethod,
      ),
    )
    .map(move => {
      const group = move.version_group_details.find(
        group => group.version_group.name === versionGroup,
      );

      if (learnMethod === 'level-up') {
        (move as FilteredMove).level_learned_at = group?.level_learned_at || 0;
      }

      if (learnMethod === 'machine') {
        const machine = move.machines?.find(machine => machine.version_group.name === versionGroup);
        (move as FilteredMove).current_version_machine = machine?.machine.url;
      }

      return move as FilteredMove;
    })
    .sort(
      learnMethod === 'level-up'
        ? (a, b) => (a as FilteredMove).level_learned_at - (b as FilteredMove).level_learned_at
        : undefined,
    );
};

const getMachineNames = async (machineMoves: FilteredMove[]): Promise<string[]> => {
  const machineClient = new MachineClient();
  const machineRequests = machineMoves
    .filter(move => move?.current_version_machine)
    .map(move => machineClient.getMachineById(getIdFromMachine(move.current_version_machine!)));

  const machines = await Promise.all(machineRequests);

  return machines.map(machine => machine.item.name);
};

const removeDuplicateMoves = (moves: NamedAPIResource[]): NamedAPIResource[] =>
  Array.from(new Set(moves.map(move => move.name))).map(
    name => moves.find(move => move.name === name)!,
  );

export { filterMoves, getMachineNames, removeDuplicateMoves };
