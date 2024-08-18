import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { MovesApi } from '@/services';
// types
import type { PokemonMove } from '@/types';
import type { Move, Pokemon, Type } from 'pokenode-ts';

export const useTypeMoves = (
  type: Type,
  options?: Partial<UseQueryOptions<Move[]>>,
): UseQueryResult<Move[]> =>
  useQuery<Move[]>({
    queryKey: ['typeMoves', type.name],
    queryFn: async () => {
      const moveRequests = type.moves.map(({ name }) => MovesApi.getByName(name));
      // fetch data for all moves
      return await Promise.all(moveRequests);

      // return movesData.map((currMove, i) => ({
      //   ...currMove,
      //   version_group_details: pokemon.moves[i].version_group_details,
      // }));
    },
    ...options,
  });
