import type { Type as PokenodeType } from 'pokenode-ts';

export interface PokemonType extends PokenodeType {
  assetType: 'type';
  id: number;
}
