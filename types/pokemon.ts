import type { NamedAPIResource } from 'pokenode-ts';

export interface Pokemon extends NamedAPIResource {
  assetType: 'pokemon';
  id: number;
}
