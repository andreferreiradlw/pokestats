import { PokemonApi } from '@/services';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { NamedAPIResource } from 'pokenode-ts';

export const usePokemonList = (
  options?: Partial<UseQueryOptions<NamedAPIResource[]>>,
): UseQueryResult<NamedAPIResource[]> =>
  useQuery<NamedAPIResource[]>({
    queryKey: ['pokemonList'],
    queryFn: async () => await PokemonApi.listPokemons(0, 905).then(({ results }) => results),
    ...options,
  });
