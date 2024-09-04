import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { MovesApi } from '@/services';
// types
import type { Move, Type } from 'pokenode-ts';

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
    },
    ...options,
  });
