// types
import type { MoveLearnMethod, Machine } from 'pokenode-ts';
import type { PokemonMove } from '@/types';
// helpers
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
  // filter pokemon moves by learn method and game version
  const groupMoves = moves.filter(move => {
    const groupDetails = move.version_group_details;
    let match = false;

    for (let moveGroup of groupDetails) {
      // check if version and learn method match
      if (
        moveGroup.version_group.name === versionGroup &&
        moveGroup.move_learn_method.name === learnMethod
      ) {
        if (learnMethod === 'level-up') {
          // add level key to move
          move['level_learned_at'] = moveGroup.level_learned_at;
        }
        // matched!
        match = true;
        break;
      }
    }

    // check if learn method is machine
    if (match && learnMethod === 'machine') {
      const machineDetails = move.machines;

      for (let machineMove of machineDetails) {
        if (machineMove.version_group.name === versionGroup) {
          // if machine matches version
          // add url key to pokemon move
          move['current_version_machine'] = machineMove.machine.url;
          break;
        }
      }
    }

    return match;
  });

  if (groupMoves.length && learnMethod === 'level-up') {
    // sort moves by level
    groupMoves.sort((a: FilteredMove, b: FilteredMove) => a.level_learned_at - b.level_learned_at);
  }

  return groupMoves as FilteredMove[];
};

const getMachineNames = async (machineMoves: FilteredMove[]): Promise<string[]> => {
  const machineClient = new MachineClient({
    cacheOptions: { maxAge: 0, limit: false },
  });
  // requests array
  const machineRequests = [];
  // create a request for each move
  machineMoves.forEach(move => {
    machineRequests.push(
      machineClient.getMachineById(getIdFromMachine(move.current_version_machine)),
    );
  });

  const machines: Machine[] = await Promise.all(machineRequests);

  return machines.map(machine => machine.item.name);
};

export { filterMoves, getMachineNames };
