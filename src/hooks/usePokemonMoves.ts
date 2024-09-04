import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { MovesApi } from '@/services';
// types
import type { PokemonMove } from '@/types';
import type { Pokemon } from 'pokenode-ts';

export const usePokemonMoves = (
  pokemon: Pokemon,
  options?: Partial<UseQueryOptions<PokemonMove[]>>,
): UseQueryResult<PokemonMove[]> =>
  useQuery<PokemonMove[]>({
    queryKey: ['pokemonMoves', pokemon.name],
    queryFn: async () => {
      const moveRequests = pokemon.moves.map(({ move }) => MovesApi.getByName(move.name));
      // fetch data for all moves
      const movesData = await Promise.all(moveRequests);

      return movesData.map((currMove, i) => ({
        ...currMove,
        version_group_details: pokemon.moves[i].version_group_details,
      }));
    },
    ...options,
  });
