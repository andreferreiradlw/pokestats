import type { Pokemon as PokenodePokemon } from 'pokenode-ts';

export interface Pokemon extends PokenodePokemon {
  assetType: 'pokemon';
  id: number;
}
