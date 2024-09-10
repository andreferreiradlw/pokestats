// @ts-nocheck

import React, { Fragment, useCallback } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Stack,
  Grid2,
  Grid2Props,
} from '@mui/material';
// types
import type { Location } from '@/pages/regions/kanto-gen1';
import type { PokemonEncounter } from 'pokenode-ts';
// helpers
import {
  formatLocationEncounters,
  getResourceId,
  mapEncounterMethodIcons,
  removeDash,
} from '@/helpers';
import equal from 'fast-deep-equal';
import { capitalize } from '@mui/material/utils';

interface LocationTableProps extends Grid2Props {
  location: Location;
}

const LocationTable = ({ location, ...rest }: LocationTableProps): JSX.Element => {
  const { key, locationAreas } = location;

  return (
    <Grid2 gap={4} flexDirection="column" {...rest}>
      {locationAreas?.length > 0 ? (
        locationAreas.map(
          ({ pokemon_encounters, name: areaName, id: areaId, location: areaLocation }) => {
            const areaSubName = capitalize(
              removeDash(areaName.replace(areaLocation.name, '')),
            ).trim();
            const formattedEncounters = formatLocationEncounters(pokemon_encounters);

            return (
              <Stack key={`${key}-${areaName}-${areaId}`} alignItems="flex-start" gap={2}>
                {areaSubName && areaSubName !== 'Area' && (
                  <Typography variant="h6">{capitalize(areaSubName)}</Typography>
                )}
                {formattedEncounters.length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell rowSpan={2}>Method</TableCell>
                          <TableCell rowSpan={2}>Pokemon</TableCell>
                          <TableCell rowSpan={2}>Versions</TableCell>
                          <TableCell rowSpan={2}>Levels</TableCell>
                          <TableCell colSpan={3}>Likelihood</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Morning</TableCell>
                          <TableCell>Day</TableCell>
                          <TableCell>Night</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formattedEncounters.map(({ name: methodName, pokemon }) => {
                          let methodRowSpan = 0;
                          pokemon.forEach(currPokemon => {
                            methodRowSpan += currPokemon.versions.length;
                          });

                          const firstPokemon = pokemon.shift();
                          const { name: firstPokemonName, versions: firstPokemonVersions } =
                            firstPokemon;
                          const firstVersion = firstPokemonVersions.shift();

                          return (
                            <Fragment key={`${areaName}-${areaId}-${methodName}`}>
                              <TableRow>
                                <TableCell rowSpan={methodRowSpan}>
                                  <Stack direction="row" alignItems="center">
                                    <img
                                      alt={methodName}
                                      src={mapEncounterMethodIcons(
                                        methodName,
                                        firstPokemonName,
                                        key,
                                        'generation-i',
                                      )}
                                    />
                                    <Typography>{removeDash(methodName)}</Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell rowSpan={firstPokemonVersions.length + 1}>
                                  <Stack direction="row" alignItems="center">
                                    <img
                                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${firstVersion.id}.png`}
                                      alt={firstPokemonName}
                                    />
                                    <Typography>{firstPokemonName}</Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell>{firstVersion.games.join(', ')}</TableCell>
                                <TableCell>
                                  {firstVersion.minLevel === firstVersion.maxLevel
                                    ? firstVersion.maxLevel
                                    : `${firstVersion.minLevel} to ${firstVersion.maxLevel}`}
                                </TableCell>
                                <TableCell colSpan={3}>{`${firstVersion.maxChance}%`}</TableCell>
                              </TableRow>
                              {firstPokemonVersions.map(
                                ({ minLevel, maxChance, maxLevel, games }) => (
                                  <TableRow key={`${methodName}-${firstPokemonName}-version`}>
                                    <TableCell>{games.join(', ')}</TableCell>
                                    <TableCell>
                                      {minLevel === maxLevel
                                        ? maxLevel
                                        : `${minLevel} to ${maxLevel}`}
                                    </TableCell>
                                    <TableCell colSpan={3}>{`${maxChance}%`}</TableCell>
                                  </TableRow>
                                ),
                              )}
                              {pokemon.map(({ name: pokemonName, versions }) => {
                                const pokemonFirstVersion = versions.shift();

                                return (
                                  <Fragment key={`${methodName}-${pokemonName}`}>
                                    <TableRow>
                                      <TableCell rowSpan={versions.length + 1}>
                                        <Stack direction="row" alignItems="center">
                                          <img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonFirstVersion.id}.png`}
                                            alt={pokemonName}
                                          />
                                          <Typography>{pokemonName}</Typography>
                                        </Stack>
                                      </TableCell>
                                      <TableCell>{pokemonFirstVersion.games.join(', ')}</TableCell>
                                      <TableCell>
                                        {pokemonFirstVersion.minLevel ===
                                        pokemonFirstVersion.maxLevel
                                          ? pokemonFirstVersion.maxLevel
                                          : `${pokemonFirstVersion.minLevel} to ${pokemonFirstVersion.maxLevel}`}
                                      </TableCell>
                                      <TableCell
                                        colSpan={3}
                                      >{`${pokemonFirstVersion.maxChance}%`}</TableCell>
                                    </TableRow>
                                    {versions.map(({ minLevel, maxChance, maxLevel, games }) => (
                                      <TableRow key={`${methodName}-${pokemonName}-version`}>
                                        <TableCell>{games.join(', ')}</TableCell>
                                        <TableCell>
                                          {minLevel === maxLevel
                                            ? maxLevel
                                            : `${minLevel} to ${maxLevel}`}
                                        </TableCell>
                                        <TableCell colSpan={3}>{`${maxChance}%`}</TableCell>
                                      </TableRow>
                                    ))}
                                  </Fragment>
                                );
                              })}
                            </Fragment>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography>No pokemon encounters in this area.</Typography>
                )}
              </Stack>
            );
          },
        )
      ) : (
        <Typography>No areas to show in current location.</Typography>
      )}
    </Grid2>
  );
};

export default LocationTable;
