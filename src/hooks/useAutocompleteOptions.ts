// types
import type { MoveType, Pokemon, PokemonType } from '@/types';
// constants
import { unusedItems } from '@/constants';
// helpers
import { type GameGenValue, getResourceId, removeDuplicateMoves } from '@/helpers';
import { ItemApi, MovesApi, PokemonApi, TypesApi } from '@/services';
// tanstack
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export interface PokestatsRegion {
  assetType: 'region';
  id: number;
  name: string;
  generation: GameGenValue;
}

export interface PokestatsToolOption {
  assetType: 'tool';
  id: number;
  name: string;
}

export interface PokestatsItemOption {
  assetType: 'item';
  id: number;
  name: string;
}

export type AutocompleteListOption =
  | Pokemon
  | PokemonType
  | MoveType
  | PokestatsRegion
  | PokestatsToolOption
  | PokestatsItemOption;

export const regionsData: PokestatsRegion[] = [
  { id: 1, assetType: 'region', name: 'kanto', generation: 'generation-i' },
];

export const headbuttData: PokestatsToolOption[] = [
  { id: 1, assetType: 'tool', name: 'headbutt-tree-finder' },
];

export const useAutocompleteOptions = (
  options?: Partial<UseQueryOptions<AutocompleteListOption[]>>,
): UseQueryResult<AutocompleteListOption[]> =>
  useQuery<AutocompleteListOption[]>({
    queryKey: ['autocomplete'],
    queryFn: async () => {
      // Fetch data in parallel and validate responses
      const [pokemonResponse, typesResponse, movesResponse, itemsResponse] = await Promise.all([
        PokemonApi.listPokemons(0, 905),
        TypesApi.listTypes(0, 18),
        MovesApi.listMoves(0, 850),
        ItemApi.listItems(),
      ]);

      // Map responses to a unified AutocompleteListOption type
      const pokemonOptions: Pokemon[] = pokemonResponse.results.map((pokemon, index) => ({
        ...pokemon,
        id: index + 1,
        assetType: 'pokemon',
      }));

      const typeOptions: PokemonType[] = typesResponse.results.map((type, index) => ({
        ...type,
        id: index + 1,
        assetType: 'type',
      }));

      const moveOptions: MoveType[] = removeDuplicateMoves(movesResponse.results).map(move => ({
        ...move,
        id: getResourceId(move.url),
        assetType: 'move',
      }));

      const itemOptions: PokestatsItemOption[] = itemsResponse.results
        .filter(({ name }) => !unusedItems.includes(name))
        .map(item => ({
          ...item,
          id: getResourceId(item.url),
          assetType: 'item',
        }));

      // Combine all options into a single array
      return [
        ...pokemonOptions,
        ...typeOptions,
        ...moveOptions,
        ...itemOptions,
        ...regionsData,
        ...headbuttData,
      ];
    },
    staleTime: 60 * 1000, // Cache for 1 minute to reduce API calls
    ...options,
  });
