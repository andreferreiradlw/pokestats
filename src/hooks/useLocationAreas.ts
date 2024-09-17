import type { Location, LocationArea, VersionEncounterDetail } from 'pokenode-ts';
import { type GameValue, listGamesByGeneration, type GameGenValue } from '@/helpers';
import { LocationApi, LocationAreaApi } from '@/services';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

interface LocationData {
  location: Location;
  locationAreas?: LocationArea[];
}

export const useLocationAreas = (
  locationId: number,
  generation: GameGenValue,
  options?: Partial<UseQueryOptions<LocationData, Error>>,
): UseQueryResult<LocationData, Error> =>
  useQuery<LocationData, Error>({
    queryKey: ['locationAreas', locationId],
    queryFn: async (): Promise<LocationData> => {
      // get location data
      const locationData = await LocationApi.getById(locationId);

      if (!locationData.areas.length)
        return {
          location: locationData,
        };

      const locationAreas = await LocationAreaApi.getByNames(
        locationData.areas.map(({ name }) => name),
      );

      const validGames = listGamesByGeneration(generation);

      const parsedLocationAreas: LocationArea[] = locationAreas.map(currArea => {
        // Filter encounters that match valid game versions
        const filteredEncounters = currArea.pokemon_encounters
          .map(encounter => {
            // Filter the version details for each encounter
            const filteredVersionDetails: VersionEncounterDetail[] =
              encounter.version_details.filter(({ version }) =>
                validGames.includes(version.name as GameValue),
              );

            // Only return encounters with valid version details
            return filteredVersionDetails.length > 0
              ? { ...encounter, version_details: filteredVersionDetails }
              : null;
          })
          .filter((encounter): encounter is NonNullable<typeof encounter> => Boolean(encounter)); // Remove null values

        return {
          ...currArea,
          pokemon_encounters: filteredEncounters,
        };
      });

      return {
        location: locationData,
        locationAreas: parsedLocationAreas,
      };
    },
    ...options,
  });
