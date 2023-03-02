import { Fragment, useCallback } from 'react';
// types
import type { Location } from '@/pages/regions/kanto-gen1';
import type { PokemonEncounter } from 'pokenode-ts';
// helpers
import { capitalise, getIdFromURL, removeDash, rowVariant } from '@/helpers';
import equal from 'fast-deep-equal';
// styles
import {
  MethodContainer,
  MethodName,
  PokemonCell,
  LocationAnchor,
  PokeImg,
  GamesContainer,
  GamePill,
} from './StyledLocationTable';
import { SectionSubTitle, UppercasedTd } from '@/components/BaseStyles';
import {
  TableContainer,
  MovesTableEl,
  TableBody,
  DataCell,
} from '@/components/MovesTable/StyledMovesTable';
// components
import { AnimatePresence } from 'framer-motion';
import Box, { BoxProps } from '../Box';

interface LocationTableProps extends BoxProps {
  location: Location;
}

interface AreaEncounters {
  name: string;
  pokemon: {
    name: string;
    versions: {
      maxLevel: number;
      minLevel: number;
      maxChance: number;
      id: number;
      games: string[];
    }[];
  }[];
}

const mapMethodIcon = (methodName: string, pokemonName: string, areaKey: string): string => {
  switch (methodName) {
    case 'walk':
      return '/static/regions/kantoGen1/walk.png';
    case 'surf':
      return '/static/regions/kantoGen1/surf.png';
    case 'good-rod':
    case 'super-rod':
    case 'old-rod':
      return '/static/regions/kantoGen1/rod.png';
    case 'pokeflute':
      return 'https://raw.githubusercontent.com/msikma/pokesprite/master/items/key-item/poke-flute.png';
    case 'only-one':
      switch (pokemonName) {
        case 'articuno':
        case 'moltres':
        case 'zapdos':
          return '/static/regions/kantoGen1/legendary.png';
        case 'mewtwo':
          return '/static/regions/kantoGen1/monster.png';
        default:
          return '/static/regions/kantoGen1/only_one.png';
      }
    case 'gift':
      switch (pokemonName) {
        case 'bulbasaur':
          switch (areaKey) {
            case 'cerulean-city':
              return '/static/regions/kantoGen1/female_trainer.png';
            default:
              return '/static/regions/kantoGen1/professor_oak.png';
          }
        case 'charmander':
          switch (areaKey) {
            case 'kanto-route-24':
              return '/static/regions/kantoGen1/male_trainer.png';
            default:
              return '/static/regions/kantoGen1/professor_oak.png';
          }
        case 'squirtle':
          switch (areaKey) {
            case 'vermilion-city':
              return '/static/regions/kantoGen1/officer_jenny.png';
            default:
              return '/static/regions/kantoGen1/professor_oak.png';
          }
        case 'pikachu':
          return '/static/regions/kantoGen1/professor_oak.png';
        case 'magikarp':
          return '/static/regions/kantoGen1/magikarp_salesman.png';
        case 'omanyte':
        case 'kabuto':
          return '/static/regions/kantoGen1/super_nerd.png';
        case 'aerodactyl':
          return '/static/regions/kantoGen1/museum_scientist.png';
        case 'hitmonlee':
        case 'hitmonchan':
          return '/static/regions/kantoGen1/karate_trainer.png';
        case 'eevee':
          switch (areaKey) {
            case 'saffron-city':
              return '/static/regions/kantoGen1/karate_trainer.png';
            default:
              return '/static/regions/kantoGen1/only_one.png';
          }
        case 'lapras':
          return '/static/regions/kantoGen1/silphco_employee.png';
        default:
          return '/static/regions/kantoGen1/only_one.png';
      }
    default:
      return '/static/regions/kantoGen1/only_one.png';
  }
};

const LocationTable = ({ location, ...rest }: LocationTableProps): JSX.Element => {
  // memo
  const formatEncounters = useCallback(
    (pokemonEncounters: PokemonEncounter[]): AreaEncounters[] => {
      let areaMethods = {};

      pokemonEncounters.forEach(({ pokemon, version_details: encounterVersions }, i) => {
        const { name: pokemonName, url } = pokemon;

        const pokemonId = getIdFromURL(url, 'pokemon');

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
                        id: pokemonId,
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
                        id: pokemonId,
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
                      id: pokemonId,
                    },
                  },
                };
              }
            }
          }
        });
      });
      // merge equal versions in areaMethods
      let aggregatedAreaVersions = [];

      Object.keys(areaMethods).forEach(methodKey => {
        let currMethod = { name: methodKey, pokemon: [] };

        Object.keys(areaMethods[methodKey]).forEach(pokemonKey => {
          const currRed = areaMethods[methodKey][pokemonKey]?.red;
          const currBlue = areaMethods[methodKey][pokemonKey]?.blue;
          const currYellow = areaMethods[methodKey][pokemonKey]?.yellow;

          if (currRed && currBlue && equal(currRed, currBlue)) {
            if (currYellow && equal(currRed, currYellow)) {
              // all versions are equal
              currMethod.pokemon.push({
                name: pokemonKey,
                versions: [
                  currRed
                    ? {
                        ...currRed,
                        games: ['red', 'blue', 'yellow'],
                      }
                    : {
                        ...currBlue,
                        games: ['red', 'blue', 'yellow'],
                      },
                ],
              });
            } else {
              // red blue equal, but yellow different or null
              currYellow
                ? currMethod.pokemon.push({
                    name: pokemonKey,
                    versions: [
                      { ...currRed, games: ['red', 'blue'] },
                      { ...currYellow, games: ['yellow'] },
                    ],
                  })
                : currMethod.pokemon.push({
                    name: pokemonKey,
                    versions: [{ ...currRed, games: ['red', 'blue'] }],
                  });
            }
          } else {
            // all versions are different
            let pokemonVersions = [
              currRed && { ...currRed, games: ['red'] },
              currBlue && { ...currBlue, games: ['blue'] },
              currYellow && { ...currYellow, games: ['yellow'] },
            ];

            currMethod.pokemon.push({
              name: pokemonKey,
              versions: pokemonVersions.filter(element => element !== undefined),
            });
          }
        });

        aggregatedAreaVersions.push(currMethod);
      });
      // return aggregated versions
      return aggregatedAreaVersions;
    },
    [],
  );

  const { key, locationAreas } = location;

  // console.log('currArea', location);

  return (
    <AnimatePresence mode="wait">
      <Box flexgap="1.5em" {...rest}>
        {locationAreas?.length > 0
          ? locationAreas.map(
              ({ pokemon_encounters, name: areaName, id: areaId, location: areaLocation }, i) => {
                const areaSubName = capitalise(
                  removeDash(areaName.replace(areaLocation.name, '')),
                ).trim();
                //
                const formattedEncounters = formatEncounters(pokemon_encounters);
                //
                return (
                  <Box
                    key={`${key}-${areaName}-${areaId}-${i}`}
                    flexalign="flex-start"
                    flexgap="1em"
                  >
                    {areaSubName && areaSubName !== 'Area' && (
                      <SectionSubTitle>{capitalise(areaSubName)}</SectionSubTitle>
                    )}
                    {formattedEncounters.length > 0 ? (
                      <TableContainer>
                        <MovesTableEl>
                          <thead>
                            <tr>
                              <th rowSpan={2}>Method</th>
                              <th rowSpan={2}>Pokemon</th>
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
                            {formattedEncounters.map(({ name: methodName, pokemon }, i) => {
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
                                  <tr>
                                    <UppercasedTd rowSpan={methodRowSpan}>
                                      <MethodContainer>
                                        <img
                                          alt="pokeflute"
                                          src={mapMethodIcon(methodName, firstPokemonName, key)}
                                        />
                                        <MethodName>{removeDash(methodName)}</MethodName>
                                      </MethodContainer>
                                    </UppercasedTd>
                                    <PokemonCell
                                      rowSpan={firstPokemonVersions.length + 1}
                                      whileHover="hover"
                                      whileTap="tap"
                                      variants={rowVariant}
                                      key={`pokemon-${methodName}-${i}-${firstPokemonName}`}
                                    >
                                      <LocationAnchor href={`/pokemon/${firstPokemonName}`}>
                                        <PokeImg
                                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${firstVersion.id}.png`}
                                        />
                                        {firstPokemonName}
                                      </LocationAnchor>
                                    </PokemonCell>
                                    <DataCell>
                                      <GamesContainer>
                                        {firstVersion.games.map((game, i) => (
                                          <GamePill
                                            key={`${firstPokemonName}-${game}-${i}`}
                                            game={game}
                                          >
                                            {game}
                                          </GamePill>
                                        ))}
                                      </GamesContainer>
                                    </DataCell>
                                    <DataCell>
                                      {firstVersion.minLevel === firstVersion.maxLevel
                                        ? firstVersion.maxLevel
                                        : `${firstVersion.minLevel} to ${firstVersion.maxLevel}`}
                                    </DataCell>
                                    <DataCell colSpan={3}>{`${firstVersion.maxChance}%`}</DataCell>
                                  </tr>
                                  {firstPokemonVersions.length > 0 &&
                                    firstPokemonVersions.map(
                                      ({ minLevel, maxChance, maxLevel, games }, i) => (
                                        <tr key={`${methodName}-${firstPokemonName}-version-${i}`}>
                                          <DataCell>
                                            <GamesContainer>
                                              {games.map((game, i) => (
                                                <GamePill
                                                  key={`${firstPokemonName}-${game}-others-${i}`}
                                                  game={game}
                                                >
                                                  {game}
                                                </GamePill>
                                              ))}
                                            </GamesContainer>
                                          </DataCell>
                                          <DataCell>
                                            {minLevel === maxLevel
                                              ? maxLevel
                                              : `${minLevel} to ${maxLevel}`}
                                          </DataCell>
                                          <DataCell colSpan={3}>{`${maxChance}%`}</DataCell>
                                        </tr>
                                      ),
                                    )}
                                  {pokemon.map(({ name: pokemonName, versions }, i) => {
                                    const pokemonFirstVersion = versions.shift();

                                    return (
                                      <Fragment key={`${methodName}-${pokemonName}-${i}`}>
                                        <tr>
                                          <PokemonCell
                                            rowSpan={versions.length + 1}
                                            whileHover="hover"
                                            whileTap="tap"
                                            variants={rowVariant}
                                            key={`pokemon-${methodName}-${i}-${pokemonName}`}
                                          >
                                            <LocationAnchor href={`/pokemon/${pokemonName}`}>
                                              <PokeImg
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonFirstVersion.id}.png`}
                                              />
                                              {pokemonName}
                                            </LocationAnchor>
                                          </PokemonCell>
                                          <DataCell>
                                            <GamesContainer>
                                              {pokemonFirstVersion.games.map((game, i) => (
                                                <GamePill
                                                  key={`${pokemonName}-${game}-${i}`}
                                                  game={game}
                                                >
                                                  {game}
                                                </GamePill>
                                              ))}
                                            </GamesContainer>
                                          </DataCell>
                                          <DataCell>
                                            {pokemonFirstVersion.minLevel ===
                                            pokemonFirstVersion.maxLevel
                                              ? pokemonFirstVersion.maxLevel
                                              : `${pokemonFirstVersion.minLevel} to ${pokemonFirstVersion.maxLevel}`}
                                          </DataCell>
                                          <DataCell
                                            colSpan={3}
                                          >{`${pokemonFirstVersion.maxChance}%`}</DataCell>
                                        </tr>
                                        {versions.length > 0 &&
                                          versions.map(
                                            ({ minLevel, maxChance, maxLevel, games }, i) => (
                                              <tr key={`${methodName}-${pokemonName}-version-${i}`}>
                                                <DataCell>
                                                  <GamesContainer>
                                                    {games.map((game, i) => (
                                                      <GamePill
                                                        key={`${pokemonName}-${game}-others-${i}`}
                                                        game={game}
                                                      >
                                                        {game}
                                                      </GamePill>
                                                    ))}
                                                  </GamesContainer>
                                                </DataCell>
                                                <DataCell>
                                                  {minLevel === maxLevel
                                                    ? maxLevel
                                                    : `${minLevel} to ${maxLevel}`}
                                                </DataCell>
                                                <DataCell colSpan={3}>{`${maxChance}%`}</DataCell>
                                              </tr>
                                            ),
                                          )}
                                      </Fragment>
                                    );
                                  })}
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
