import { EncountersApi, LocationApi, LocationAreaApi } from '@/services';
import { useQuery, type UseQueryOptions, type UseQueryResult } from '@tanstack/react-query';
import type { Location, LocationArea, NamedAPIResource, VersionEncounterDetail } from 'pokenode-ts';

export interface EncounterData {
  location: Location;
  location_area: LocationArea;
  version_details: VersionEncounterDetail;
}

export const usePokemonEncounters = (
  id: number,
  gameVersion: string,
  options?: Partial<UseQueryOptions<EncounterData[]>>,
): UseQueryResult<EncounterData[]> =>
  useQuery<EncounterData[]>({
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
      const locationAreaData = await Promise.all(
        filteredEncounters.map(({ location_area }) =>
          LocationAreaApi.getByName(location_area.name),
        ),
      );

      const locationData = await Promise.all(
        locationAreaData.map(({ location }) => LocationApi.getByName(location.name)),
      );

      // Combine filtered encounters with their corresponding location data
      return filteredEncounters.map(({ version_details }, index) => ({
        location: locationData[index],
        location_area: locationAreaData[index],
        version_details,
      }));
    },
    ...options,
  });
