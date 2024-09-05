import { EncountersApi } from '@/services';
import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';
import type { LocationAreaEncounter } from 'pokenode-ts';

export const usePokemonEncounters = (
  id: number,
  options?: Partial<UseQueryOptions<LocationAreaEncounter[]>>,
): UseQueryResult<LocationAreaEncounter[]> =>
  useQuery<LocationAreaEncounter[]>({
    queryKey: ['pokemonEncounters', id],
    queryFn: async () => await EncountersApi.getById(id),
    ...options,
  });
