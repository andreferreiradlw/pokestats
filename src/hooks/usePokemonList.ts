import { PokemonApi } from '@/services';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { NamedAPIResource } from 'pokenode-ts';

export const usePokemonList = (
  options?: Partial<UseQueryOptions<NamedAPIResource[]>>,
): UseQueryResult<NamedAPIResource[]> =>
  useQuery<NamedAPIResource[]>({
    queryKey: ['pokemonList'],
    queryFn: async () => await PokemonApi.listPokemons(0, 905).then(({ results }) => results),
    ...options,
  });
