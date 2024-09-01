import type { MoveLearnMethod, NamedAPIResource } from 'pokenode-ts';
import type { PokemonMove } from '@/types';

export interface FilteredMove extends PokemonMove {
  level_learned_at: number;
  current_version_machine?: string;
}

export const filterMoves = (
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

export const removeDuplicateMoves = (moves: NamedAPIResource[]): NamedAPIResource[] => {
  const uniqueMovesMap = new Map<string, NamedAPIResource>(moves.map(move => [move.name, move]));

  return Array.from(uniqueMovesMap.values());
};

export const mapTypeToPokemonId = (typeName: string): number | undefined => {
  const typeToIdMap: Record<string, number> = {
    fire: 392, // Infernape
    dragon: 149, // Dragonite
    water: 131, // Lapras
    electric: 26, // Raichu
    normal: 493, // Arceus
    fighting: 257, // Blaziken
    flying: 249, // Lugia
    poison: 110, // Weezing
    ground: 95, // Onyx
    rock: 377, // Regirock
    bug: 212, // Scizor
    ghost: 92, // Gasly
    steel: 208, // Steelix
    grass: 154, // Meganium
    psychic: 65, // Alakazam
    ice: 144, // Articuno
    dark: 491, // Darkrai
    fairy: 36, // Clefable
  };

  return typeToIdMap[typeName];
};

export const isFoeAffected = (targetName: string): boolean =>
  ['all-other-pokemon', 'all-opponents', 'entire-field', 'opponents-field'].includes(targetName);

export const isFoeSelected = (targetName: string): boolean =>
  ['selected-pokemon', 'selected-pokemon-me-first'].includes(targetName);

export const isAllyAffected = (targetName: string): boolean =>
  ['all-other-pokemon', 'entire-field', 'users-field', 'user-and-allies'].includes(targetName);

export const isAllySelected = (targetName: string): boolean =>
  ['selected-pokemon', 'ally'].includes(targetName);

export const isSelfAffected = (targetName: string): boolean =>
  ['entire-field', 'user-and-allies', 'users-field'].includes(targetName);

export const isSelfSelected = (targetName: string): boolean => targetName === 'user';
