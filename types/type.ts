import type { PokemonType as PokenodeType } from 'pokenode-ts';

export interface PokemonType extends PokenodeType {
  assetType: 'type';
  id: number;
}
