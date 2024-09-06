import { EncountersApi, LocationAreaApi } from '@/services';
import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';
import type { LocationArea, NamedAPIResource, VersionEncounterDetail } from 'pokenode-ts';

interface Encounters {
  location_area: LocationArea;
  version_details: VersionEncounterDetail;
}

export const usePokemonEncounters = (
  id: number,
  gameVersion: string,
  options?: Partial<UseQueryOptions<Encounters[]>>,
): UseQueryResult<Encounters[]> =>
  useQuery<Encounters[]>({
    queryKey: ['pokemonEncounters', id, gameVersion],
    queryFn: async () => {
      const encounters = await EncountersApi.getById(id);

      // Filter relevant encounters based on the game version
      const filteredEncounters = encounters.reduce<
        { location_area: NamedAPIResource; version_details: VersionEncounterDetail }[]
      >((acc, area) => {
        const currVersionDetails = area.version_details.find(
          details => details.version.name === gameVersion,
        );

        if (currVersionDetails) {
          acc.push({
            location_area: area.location_area,
            version_details: currVersionDetails,
          });
        }

        return acc;
      }, []);

      // If there are no relevant encounters, return early
      if (filteredEncounters.length === 0) {
        return [];
      }

      // Fetch location data in parallel
      const locationData = await Promise.all(
        filteredEncounters.map(({ location_area }) =>
          LocationAreaApi.getByName(location_area.name),
        ),
      );

      // Combine filtered encounters with their corresponding location data
      return filteredEncounters.map(({ version_details }, index) => ({
        location_area: locationData[index],
        version_details,
      }));
    },
    ...options,
  });
