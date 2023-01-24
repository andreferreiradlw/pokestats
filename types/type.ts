import type { NamedAPIResource } from 'pokenode-ts';

export interface PokemonType extends NamedAPIResource {
  assetType: 'type';
  id: number;
}
