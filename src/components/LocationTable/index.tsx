import { Fragment, useCallback } from 'react';
import { useRouter } from 'next/router';
// types
import type { Location } from '@/pages/regions/kanto-gen1';
import type { PokemonEncounter, VersionEncounterDetail } from 'pokenode-ts';
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
  DataCell,
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
  if (obj) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
  }
  return null;
};

const LocationTable = ({ location, ...rest }: LocationTableProps): JSX.Element => {
  console.log('table area', location);
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

        if (encounter_details) {
          // variables
          let maxLevel: number;
          let minLevel: number;
          let method: string;
          let maxChance = max_chance > 100 ? null : max_chance;

          for (const {
            max_level,
            min_level,
            method: currMethod,
            chance,
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
            if (!maxChance) {
              maxChance = chance;
            } else if (chance > maxChance) {
              maxChance = chance;
            }
            if (!method) method = currMethod.name;
          }

          areaEncounters.push({
            maxLevel: maxLevel,
            minLevel: minLevel,
            method: method,
            maxChance: maxChance,
            gameVersions: games,
          });
        }
      }

      return areaEncounters;
    },
    [],
  );

  const formatEncounters = (pokemonEncounters: PokemonEncounter[]) => {
    let areaMethods = {};

    pokemonEncounters.forEach(({ pokemon, version_details: encounterVersions }, i) => {
      const { name: pokemonName, url } = pokemon;

      encounterVersions.forEach(({ encounter_details, max_chance, version }, i) => {
        let maxChance = max_chance > 100 ? null : max_chance;

        if (encounter_details) {
          // organise encounters per method
          for (const {
            max_level,
            min_level,
            method: currMethod,
            chance,
            condition_values, // TODO
          } of encounter_details) {
            // check if method key already exists
            if (areaMethods[currMethod.name]) {
              // check if method.pokemon key already exists
              if (areaMethods[currMethod.name]?.[pokemonName]) {
                if (areaMethods[currMethod.name][pokemonName][version.name]) {
                  // update pokemon key for version
                  const { maxLevel, minLevel, maxChance } =
                    areaMethods[currMethod.name][pokemonName][version.name];
                  // compare values and adjust
                  if (maxLevel < max_level) {
                    areaMethods[currMethod.name][pokemonName][version.name].maxLevel = max_level;
                  }
                  if (minLevel > min_level) {
                    areaMethods[currMethod.name][pokemonName][version.name].minLevel = min_level;
                  }
                  if (chance > maxChance) {
                    areaMethods[currMethod.name][pokemonName][version.name].maxChance = chance;
                  }
                } else {
                  // update pokemon key for version
                  areaMethods[currMethod.name][pokemonName] = {
                    ...areaMethods[currMethod.name][pokemonName],
                    [version.name]: {
                      maxLevel: max_level,
                      minLevel: min_level,
                      maxChance: chance > maxChance ? chance : maxChance,
                    },
                  };
                }
              } else {
                // create new pokemon key for method
                areaMethods[currMethod.name] = {
                  ...areaMethods[currMethod.name],
                  [pokemonName]: {
                    [version.name]: {
                      maxLevel: max_level,
                      minLevel: min_level,
                      maxChance: chance > maxChance ? chance : maxChance,
                    },
                  },
                };
              }
            } else {
              // create new method and pokemon key
              areaMethods[currMethod.name] = {
                [pokemonName]: {
                  [version.name]: {
                    maxLevel: max_level,
                    minLevel: min_level,
                    maxChance: chance > maxChance ? chance : maxChance,
                  },
                },
              };
            }
          }
        }
      });
    });
    // TODO merge equal versions in areaMethods
    // return area methods
    return areaMethods;
  };

  const { key, locationAreas } = location;

  return (
    <AnimatePresence mode="wait">
      <Box flexgap="1.5em" {...rest}>
        {locationAreas?.length > 0
          ? locationAreas.map(
              ({ pokemon_encounters, names: areaNames, name: areaName, id: areaId }) => {
                const areaSubName = betweentParenthesis(areaNames[0].name);
                //
                const formattedEncounters = formatEncounters(pokemon_encounters);
                console.log('formattedEncounters', formattedEncounters);
                //
                return (
                  <Box key={`${key}-${areaName}-${areaId}`} flexalign="flex-start" flexgap="1em">
                    {areaSubName && <SectionSubTitle>{capitalise(areaSubName)}</SectionSubTitle>}
                    {pokemon_encounters.length > 0 ? (
                      <TableContainer>
                        <MovesTableEl>
                          <thead>
                            <tr>
                              <th rowSpan={2}>Pokemon</th>
                              <th rowSpan={2}>Method</th>
                              <th rowSpan={2}>Versions</th>
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
                              // console.log('currVersionDetails', pokemonName, currVersionDetails);

                              const firstVersion = currVersionDetails.shift();

                              return (
                                <Fragment key={`${areaName}-${areaId}-${pokemonName}`}>
                                  <TableRow>
                                    <DataCell
                                      rowSpan={currVersionDetails.length + 1}
                                      onClick={() => router.push(`/pokemon/${pokemonName}`)}
                                    >
                                      <LocationCell>
                                        <PokeImg
                                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromURL(
                                            url,
                                            'pokemon',
                                          )}.png`}
                                        />
                                        {pokemonName}
                                      </LocationCell>
                                    </DataCell>

                                    <DataCell rowSpan={currVersionDetails.length + 1}>
                                      {firstVersion.method}
                                    </DataCell>
                                    <DataCell>{firstVersion.gameVersions.join(', ')}</DataCell>
                                    <DataCell>
                                      {firstVersion.minLevel === firstVersion.maxLevel
                                        ? firstVersion.maxLevel
                                        : `${firstVersion.minLevel} to ${firstVersion.maxLevel}`}
                                    </DataCell>
                                    <DataCell colSpan={3}>{`${firstVersion.maxChance}%`}</DataCell>
                                  </TableRow>
                                  {!!currVersionDetails?.length &&
                                    currVersionDetails.map(
                                      ({ gameVersions, maxChance, maxLevel, minLevel }, i) => (
                                        <TableRow
                                          key={`${areaName}-${areaId}-${pokemonName}-version-${i}`}
                                        >
                                          <DataCell>{gameVersions.join(', ')}</DataCell>
                                          <DataCell>
                                            {minLevel === maxLevel
                                              ? maxLevel
                                              : `${minLevel} to ${maxLevel}`}
                                          </DataCell>
                                          <DataCell colSpan={3}>{`${maxChance}%`}</DataCell>
                                        </TableRow>
                                      ),
                                    )}
                                </Fragment>
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
