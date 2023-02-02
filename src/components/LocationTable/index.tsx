import { useCallback } from 'react';
import { useRouter } from 'next/router';
// types
import type { Location } from '@/pages/regions/kanto-gen1';
import type { VersionEncounterDetail } from 'pokenode-ts';
// helpers
import { betweentParenthesis, capitalise, getIdFromURL } from '@/helpers';
// styles
import { LocationCell, PokeImg } from './StyledLocationTable';
import { SectionSubTitle } from '@/components/BaseStyles';
import {
  TableContainer,
  MovesTableEl,
  TableBody,
  TableRow,
} from '@/components/MovesTable/StyledMovesTable';
// components
import { AnimatePresence } from 'framer-motion';
import Box, { BoxProps } from '../Box';

interface LocationTableProps extends BoxProps {
  location: Location;
}

interface AreaEncounters {
  maxLevel: number;
  minLevel: number;
  method: string;
  maxChance: number;
  gameVersions: string[];
}

const omit = (key: string, obj: Record<string, any>): Record<string, any> => {
  const { [key]: omitted, ...rest } = obj;
  return rest;
};

const LocationTable = ({ location, ...rest }: LocationTableProps): JSX.Element => {
  // console.log('table area', location);
  // router
  const router = useRouter();
  // memo
  const processVersion = useCallback(
    (encounterVersions: VersionEncounterDetail[]): AreaEncounters[] => {
      // arrays
      let gameVersions: {
        encounter_details: VersionEncounterDetail['encounter_details'];
        games: string[];
        max_chance: VersionEncounterDetail['max_chance'];
        version: VersionEncounterDetail['version'];
      }[] = [];
      let areaEncounters: AreaEncounters[] = [];
      // red
      const redVersion = encounterVersions.find(encounter => encounter.version.name === 'red');
      const redOmit = omit('version', redVersion);
      // blue
      const blueVersion = encounterVersions.find(encounter => encounter.version.name === 'blue');
      const blueOmit = omit('version', blueVersion);
      // yellow
      const yellowVersion = encounterVersions.find(
        encounter => encounter.version.name === 'yellow',
      );
      const yellowOmit = omit('version', yellowVersion);
      // compare version objects
      if (JSON.stringify(redOmit) === JSON.stringify(blueOmit)) {
        if (JSON.stringify(redOmit) === JSON.stringify(yellowOmit)) {
          // all equal
          gameVersions.push({ ...redVersion, games: ['red', 'blue', 'yellow'] });
        } else {
          // yellow is defferent
          gameVersions.push(
            { ...redVersion, games: ['red', 'blue'] },
            { ...yellowVersion, games: ['yellow'] },
          );
        }
      } else {
        // all versions are different
        gameVersions.push(
          { ...redVersion, games: ['red'] },
          { ...blueVersion, games: ['blue'] },
          { ...yellowVersion, games: ['yellow'] },
        );
      }
      // process versions
      for (const game of gameVersions) {
        // data
        const { encounter_details, max_chance, games } = game;
        // variables
        let maxLevel: number;
        let minLevel: number;
        let method: string;

        for (const {
          max_level,
          min_level,
          method: currMethod,
          condition_values, // TODO
        } of encounter_details) {
          if (!maxLevel) {
            maxLevel = max_level;
          } else if (max_level > maxLevel) {
            maxLevel = max_level;
          }
          if (!minLevel) {
            minLevel = min_level;
          } else if (min_level < minLevel) {
            minLevel = min_level;
          }
          if (!method) method = currMethod.name;
        }

        areaEncounters.push({
          maxLevel: maxLevel,
          minLevel: minLevel,
          method: method,
          maxChance: max_chance,
          gameVersions: games,
        });
      }

      return areaEncounters;
    },
    [],
  );

  const { key, locationAreas } = location;

  return (
    <AnimatePresence mode="wait">
      <Box flexgap="1.5em" {...rest}>
        {locationAreas?.length > 0
          ? locationAreas.map(
              ({ pokemon_encounters, names: areaNames, name: areaName, id: areaId }) => {
                return (
                  <Box key={`${key}-${areaName}-${areaId}`} flexalign="flex-start" flexgap="1em">
                    <SectionSubTitle>
                      {capitalise(betweentParenthesis(areaNames[0].name))}
                    </SectionSubTitle>
                    {pokemon_encounters.length > 0 ? (
                      <TableContainer>
                        <MovesTableEl>
                          <thead>
                            <tr>
                              <th colSpan={2} rowSpan={2}>
                                Pokemon
                              </th>
                              <th rowSpan={2}>Versions</th>
                              <th rowSpan={2}>Method</th>
                              <th rowSpan={2}>Levels</th>
                              <th colSpan={3}>Likelihood</th>
                            </tr>
                            <tr>
                              <td>Morning</td>
                              <td>Day</td>
                              <td>Night</td>
                            </tr>
                          </thead>
                          <TableBody>
                            {pokemon_encounters.map(({ pokemon, version_details }, i) => {
                              const { name: pokemonName, url } = pokemon;
                              // prefetch pokemon page
                              router.prefetch(`/pokemon/${pokemonName}`);

                              const currVersionDetails = processVersion(version_details);
                              console.log('currVersionDetails', pokemonName, currVersionDetails);

                              return (
                                <TableRow key={`${areaName}-${areaId}-${pokemonName}`}>
                                  <LocationCell
                                    onClick={() => router.push(`/pokemon/${pokemonName}`)}
                                  >
                                    <PokeImg
                                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromURL(
                                        url,
                                        'pokemon',
                                      )}.png`}
                                    />
                                    {pokemonName}
                                  </LocationCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </MovesTableEl>
                      </TableContainer>
                    ) : (
                      'No pokemon encounters in this area.'
                    )}
                  </Box>
                );
              },
            )
          : 'No areas to show in current location.'}
      </Box>
    </AnimatePresence>
  );
};

export default LocationTable;
