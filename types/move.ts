import type { Move } from 'pokenode-ts';

export interface PokemonMove extends Move {
  version_group_details: {
    level_learned_at: number;
    move_learn_method: { name: string; url: string };
    version_group: { name: string; url: string };
  }[];
}
