import type { MoveLearnMethod, NamedAPIResource } from 'pokenode-ts';
import type { PokemonMove } from '@/types';

export interface FilteredMove extends PokemonMove {
  level_learned_at: number;
  current_version_machine?: string;
}

const filterMoves = (
  moves: PokemonMove[],
  learnMethod: MoveLearnMethod['name'],
  versionGroup: string,
): FilteredMove[] =>
  moves
    .map((move): FilteredMove | null => {
      const group = move.version_group_details.find(
        group =>
          group.version_group.name === versionGroup && group.move_learn_method.name === learnMethod,
      );

      if (!group) return null;

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const filteredMove: FilteredMove = { ...move } as FilteredMove;

      if (learnMethod === 'level-up') {
        filteredMove.level_learned_at = group.level_learned_at || 0;
      }

      if (learnMethod === 'machine') {
        const machine = move.machines?.find(machine => machine.version_group.name === versionGroup);
        filteredMove.current_version_machine = machine?.machine.url;
      }

      return filteredMove;
    })
    .filter((move): move is FilteredMove => move !== null)
    .sort((a, b) => (learnMethod === 'level-up' ? a.level_learned_at - b.level_learned_at : 0));

const removeDuplicateMoves = (moves: NamedAPIResource[]): NamedAPIResource[] => {
  const uniqueMovesMap = new Map<string, NamedAPIResource>();

  moves.forEach(move => {
    if (!uniqueMovesMap.has(move.name)) {
      uniqueMovesMap.set(move.name, move);
    }
  });

  return Array.from(uniqueMovesMap.values());
};

export { filterMoves, removeDuplicateMoves };
