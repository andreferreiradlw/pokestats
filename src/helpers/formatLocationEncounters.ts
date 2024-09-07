import equal from 'fast-deep-equal';
import type { PokemonEncounter } from 'pokenode-ts';
import { getResourceId } from '@/helpers';

interface VersionEntry {
  maxLevel: number;
  minLevel: number;
  maxChance: number;
  id: number;
}

type PokemonEntry = Record<string, VersionEntry>;

type MethodEntry = Record<string, PokemonEntry>;

type AreaMethods = Record<string, MethodEntry>;

export interface AreaEncounters {
  name: string;
  pokemon: {
    name: string;
    versions: VersionEntryWithGames[];
  }[];
}

interface VersionEntryWithGames extends VersionEntry {
  games: string[];
}

// Helper function to merge versions
const mergeVersions = (
  pokemonKey: string,
  versions: Record<string, VersionEntry>,
): AreaEncounters['pokemon'][number] => {
  const currRed = versions.red;
  const currBlue = versions.blue;
  const currYellow = versions.yellow;

  if (currRed && currBlue && equal(currRed, currBlue)) {
    if (currYellow && equal(currRed, currYellow)) {
      return {
        name: pokemonKey,
        versions: [{ ...currRed, games: ['red', 'blue', 'yellow'] }],
      };
    } else {
      return {
        name: pokemonKey,
        versions: [
          { ...currRed, games: ['red', 'blue'] },
          ...(currYellow ? [{ ...currYellow, games: ['yellow'] }] : []),
        ],
      };
    }
  } else {
    const pokemonVersions = [
      currRed && { ...currRed, games: ['red'] },
      currBlue && { ...currBlue, games: ['blue'] },
      currYellow && { ...currYellow, games: ['yellow'] },
    ].filter(Boolean) as VersionEntryWithGames[];

    return { name: pokemonKey, versions: pokemonVersions };
  }
};

export const formatLocationEncounters = (
  pokemonEncounters: PokemonEncounter[],
): AreaEncounters[] => {
  // Use reduce to process the encounters
  const areaMethods = pokemonEncounters.reduce<AreaMethods>(
    (acc: AreaMethods, { pokemon, version_details: encounterVersions }) => {
      const { name: pokemonName, url } = pokemon;
      const pokemonId = getResourceId(url);

      encounterVersions.forEach(({ encounter_details, max_chance, version }) => {
        const maxChance = max_chance > 100 ? null : max_chance;

        encounter_details?.forEach(({ max_level, min_level, method: currMethod, chance }) => {
          const methodName = currMethod.name;

          // Initialize method and pokemon entries if they don't exist
          if (!acc[methodName]) acc[methodName] = {};
          if (!acc[methodName][pokemonName]) acc[methodName][pokemonName] = {};

          const existingEntry = acc[methodName][pokemonName][version.name];

          if (existingEntry) {
            // Update existing entry with the maximum and minimum values
            existingEntry.maxLevel = Math.max(existingEntry.maxLevel, max_level);
            existingEntry.minLevel = Math.min(existingEntry.minLevel, min_level);
            existingEntry.maxChance = Math.max(existingEntry.maxChance, chance);
          } else {
            // Create a new entry for the current version
            acc[methodName][pokemonName][version.name] = {
              maxLevel: max_level,
              minLevel: min_level,
              maxChance: Math.max(chance, maxChance ?? 0), // Ensure maxChance is a number
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
      method.pokemon.push(mergeVersions(pokemonKey, versions));
    });

    return method;
  });

  return aggregatedAreaVersions;
};
