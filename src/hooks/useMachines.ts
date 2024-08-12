import { FilteredMove, getIdFromMachine } from '@/helpers';
import { MachineApi } from '@/services';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export const useMachines = (
  moves: FilteredMove[],
  pokemonName: string,
  options?: Partial<UseQueryOptions<string[]>>,
): UseQueryResult<string[]> =>
  useQuery<string[]>({
    queryKey: ['machine', pokemonName],
    queryFn: async () => {
      const machineIds = moves
        .filter(({ current_version_machine }) => current_version_machine)
        .map(({ current_version_machine }) => getIdFromMachine(current_version_machine));

      const machines = await MachineApi.getByIds(machineIds);

      return machines.map(({ item }) => item.name);
    },
    ...options,
  });
