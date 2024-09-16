import { Fragment } from 'react';
// types
import type { LocationArea } from 'pokenode-ts';
// helpers
import {
  capitalise,
  findEnglishName,
  formatLocationEncounters,
  formatPokemonId,
  type GameGenValue,
  mapEncounterMethodIcons,
  removeDash,
  type VersionEntryWithGames,
} from '@/helpers';
// styles
import { GamePill, MethodContainer, PokemonCell } from './StyledLocationTableV2';
// components
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
  type Grid2Props,
} from '@mui/material';

interface LocationTableProps extends Grid2Props {
  locationAreas: LocationArea[];
  generation: GameGenValue;
  region?: string;
}

// Helper function to render a single version row
const renderVersionRow = (version: VersionEntryWithGames) => (
  <>
    <TableCell>
      <Stack justifyContent="center" alignItems="center" gap={1} flexDirection="row">
        {version.games.map(game => (
          <GamePill key={`game-${version.id}-${game}`} game={game}>
            {capitalise(game)}
          </GamePill>
        ))}
      </Stack>
    </TableCell>
    <TableCell align="center">
      {version.minLevel === version.maxLevel
        ? version.maxLevel
        : `${version.minLevel} to ${version.maxLevel}`}
    </TableCell>
    <TableCell colSpan={3} align="center">{`${version.maxChance}%`}</TableCell>
  </>
);

const LocationTableV2 = ({
  locationAreas,
  generation,
  region,
  ...rest
}: LocationTableProps): JSX.Element => {
  return (
    <Grid2 size={12} gap={4} flexDirection="column" {...rest}>
      {locationAreas.map(({ pokemon_encounters, name: areaName, id: areaId, names }) => {
        // Format encounters for the current area
        const formattedEncounters = formatLocationEncounters(pokemon_encounters);

        return (
          <Stack key={`${areaName}-${areaId}-container`} alignItems="flex-start" gap={2}>
            {/* Display the area name if there are multiple locations */}
            {locationAreas.length > 1 && (
              <Typography variant="h6" gutterBottom>
                {findEnglishName(names)}
              </Typography>
            )}
            {/* Render the table if there are encounters; otherwise, show a message */}
            {formattedEncounters.length > 0 ? (
              <TableContainer>
                <Table>
                  {/* Table headers */}
                  <TableHead>
                    <TableRow>
                      <TableCell rowSpan={2} align="center">
                        Method
                      </TableCell>
                      <TableCell rowSpan={2} align="center">
                        Pokemon
                      </TableCell>
                      <TableCell rowSpan={2} align="center">
                        Versions
                      </TableCell>
                      <TableCell rowSpan={2} align="center">
                        Levels
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        Likelihood
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">Morning</TableCell>
                      <TableCell align="center">Day</TableCell>
                      <TableCell align="center">Night</TableCell>
                    </TableRow>
                  </TableHead>
                  {/* Table body */}
                  <TableBody>
                    {formattedEncounters.map(({ name: methodName, pokemon }) => {
                      const methodRowSpan = pokemon.reduce(
                        (total, p) => total + p.versions.length,
                        0,
                      );

                      return (
                        <Fragment key={`${areaName}-${areaId}-${methodName}-row`}>
                          {pokemon.map(({ name: pokemonName, versions }, pokemonIndex) => (
                            <Fragment key={`${methodName}-${pokemonName}-${pokemonIndex}`}>
                              <TableRow>
                                {/* Render the method cell only once per method */}
                                {pokemonIndex === 0 && (
                                  <TableCell rowSpan={methodRowSpan}>
                                    <MethodContainer>
                                      {region && (
                                        <img
                                          src={mapEncounterMethodIcons(
                                            methodName,
                                            pokemonName,
                                            areaName,
                                            generation,
                                            region,
                                          )}
                                          alt={methodName}
                                          height="40px"
                                        />
                                      )}
                                      <Typography textTransform="capitalize">
                                        {removeDash(methodName)}
                                      </Typography>
                                    </MethodContainer>
                                  </TableCell>
                                )}
                                {/* Render the first version of the Pokemon */}
                                <PokemonCell rowSpan={versions.length}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    gap={2}
                                  >
                                    <img
                                      width="60px"
                                      src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${formatPokemonId(versions[0].id)}.png`}
                                      alt={pokemonName}
                                    />
                                    <Typography textTransform="capitalize">
                                      {removeDash(pokemonName)}
                                    </Typography>
                                  </Stack>
                                </PokemonCell>
                                {renderVersionRow(versions[0])}
                              </TableRow>
                              {/* Render remaining versions for the same Pokemon */}
                              {versions.slice(1).map((version, versionIndex) => (
                                <TableRow key={`${methodName}-${pokemonName}-${versionIndex + 1}`}>
                                  {renderVersionRow(version)}
                                </TableRow>
                              ))}
                            </Fragment>
                          ))}
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
      })}
    </Grid2>
  );
};

export default LocationTableV2;
