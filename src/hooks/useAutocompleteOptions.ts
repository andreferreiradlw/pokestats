import { type GameGenValue, getResourceId, removeDuplicateMoves } from '@/helpers';
import { MovesApi, PokemonApi, TypesApi } from '@/services';
import type { MoveType, Pokemon, PokemonType } from '@/types';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export interface PokestatsRegion {
  assetType: 'region';
  id: number;
  name: string;
  generation: GameGenValue;
}

export type AutocompleteListOption = Pokemon | PokemonType | MoveType | PokestatsRegion;

export const regionsData: PokestatsRegion[] = [
  { id: 1, assetType: 'region', name: 'kanto', generation: 'generation-i' },
];

export const useAutocompleteOptions = (
  options?: Partial<UseQueryOptions<AutocompleteListOption[]>>,
): UseQueryResult<AutocompleteListOption[]> =>
  useQuery<AutocompleteListOption[]>({
    queryKey: ['autocomplete'],
    queryFn: async () => {
      // fetch data
      const [pokemonResponse, typesResponse, movesResponse] = await Promise.all([
        PokemonApi.listPokemons(0, 905),
        TypesApi.listTypes(0, 18),
        MovesApi.listMoves(0, 850),
      ]);

      const allOptions: AutocompleteListOption[] = [];

      // pokemon
      pokemonResponse.results.forEach((currPokemon, i) => {
        allOptions.push({
          ...currPokemon,
          id: i + 1,
          assetType: 'pokemon',
        });
      });

      // types
      typesResponse.results.forEach((currType, i) => {
        allOptions.push({
          ...currType,
          id: i + 1,
          assetType: 'type',
        });
      });

      // moves
      removeDuplicateMoves(movesResponse.results).forEach(currMove => {
        allOptions.push({
          ...currMove,
          id: getResourceId(currMove.url),
          assetType: 'move',
        });
      });

      // regions
      regionsData.forEach(currRegion => {
        allOptions.push(currRegion);
      });

      return allOptions;
    },
    staleTime: 60 * 1000, // Cache for 1 minute to reduce API calls
    ...options,
  });
