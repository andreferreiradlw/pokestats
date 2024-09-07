import equal from 'fast-deep-equal';
import type { PokemonEncounter } from 'pokenode-ts';
import { type GameValue, getResourceId, gameVersions } from '@/helpers'; // Ensure gameVersions is imported

interface VersionEntry {
  maxLevel: number;
  minLevel: number;
  maxChance: number;
  id: number;
}

type PokemonEntry = Record<string, VersionEntry>;
type MethodEntry = Record<string, PokemonEntry>;
type AreaMethods = Record<string, MethodEntry>;

interface VersionEntryWithGames extends VersionEntry {
  games: GameValue[];
}

export interface AreaEncounters {
  name: string;
  pokemon: {
    name: string;
    versions: VersionEntryWithGames[];
  }[];
}

// Helper function to merge versions
const mergeVersions = (
  pokemonKey: string,
  versions: Record<GameValue, VersionEntry>,
): AreaEncounters['pokemon'][number] => {
  const gameValues = Object.keys(versions) as GameValue[];

  const groupedVersions: VersionEntryWithGames[] = [];

  gameValues.forEach(gameValue => {
    const matchingEntry = groupedVersions.find(group =>
      equal(group, { ...versions[gameValue], games: group.games }),
    );

    if (matchingEntry) {
      matchingEntry.games.push(gameValue);
    } else {
      groupedVersions.push({
        ...versions[gameValue],
        games: [gameValue],
      });
    }
  });

  return {
    name: pokemonKey,
    versions: groupedVersions,
  };
};

// Main function to format encounters
export const formatLocationEncounters = (
  pokemonEncounters: PokemonEncounter[],
): AreaEncounters[] => {
  const areaMethods = pokemonEncounters.reduce<AreaMethods>(
    (acc: AreaMethods, { pokemon, version_details: encounterVersions }) => {
      const { name: pokemonName, url } = pokemon;
      const pokemonId = getResourceId(url);

      encounterVersions.forEach(({ encounter_details, max_chance, version }) => {
        const maxChance = max_chance > 100 ? null : max_chance;

        encounter_details?.forEach(({ max_level, min_level, method: currMethod, chance }) => {
          const methodName = currMethod.name;

          if (!acc[methodName]) acc[methodName] = {};
          if (!acc[methodName][pokemonName]) acc[methodName][pokemonName] = {};

          const existingEntry = acc[methodName][pokemonName][version.name];

          if (existingEntry) {
            existingEntry.maxLevel = Math.max(existingEntry.maxLevel, max_level);
            existingEntry.minLevel = Math.min(existingEntry.minLevel, min_level);
            existingEntry.maxChance = Math.max(existingEntry.maxChance, chance);
          } else {
            acc[methodName][pokemonName][version.name] = {
              maxLevel: max_level,
              minLevel: min_level,
              maxChance: Math.max(chance, maxChance ?? 0),
              id: pokemonId,
            };
          }
        });
      });

      return acc;
    },
    {},
  );

  // Aggregate and merge versions
  const aggregatedAreaVersions = Object.keys(areaMethods).map(methodKey => {
    const method = { name: methodKey, pokemon: [] as AreaEncounters['pokemon'] };

    Object.keys(areaMethods[methodKey]).forEach(pokemonKey => {
      const versions = areaMethods[methodKey][pokemonKey];

      // Ensuring only valid GameValues are passed to mergeVersions
      const validVersions: Record<GameValue, VersionEntry> = Object.keys(versions)
        .filter((key): key is GameValue => {
          return gameVersions.some(game => game.value === key);
        })
        .reduce<Record<GameValue, VersionEntry>>(
          (obj, key) => {
            obj[key as GameValue] = versions[key];
            return obj;
          },
          {} as Record<GameValue, VersionEntry>,
        );

      method.pokemon.push(mergeVersions(pokemonKey, validVersions));
    });

    return method;
  });

  return aggregatedAreaVersions;
};
