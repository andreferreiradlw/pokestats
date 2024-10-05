import { createContext, useState, useMemo, type ReactNode } from 'react';
// helpers
import {
  type GameValue,
  gameVersions,
  mapGameValueToGenerationValue,
  type Game,
  type GameGenValue,
} from '@/helpers';
// types
import type { PokemonSpecies } from 'pokenode-ts';

interface GameVersionContextProps {
  gameVersion?: GameValue;
  gameGeneration: GameGenValue;
  setGameVersion: (version: string) => void;
  dropdownOptions: Game[];
  gameDetails?: Game;
}

interface GameVersionProviderProps {
  children: ReactNode;
  pokemon?: PokemonSpecies;
}

export const GameVersionContext = createContext<GameVersionContextProps>({
  gameVersion: undefined,
  gameGeneration: '' as GameGenValue,
  setGameVersion: () => {},
  dropdownOptions: [],
  gameDetails: undefined,
});

export const GameVersionProvider = ({ children, pokemon }: GameVersionProviderProps) => {
  const [gameVersion, setGameVersion] = useState<string>();
  // const [gameDetails, setGameDetails] = useState<Game>();

  const gameDetails = useMemo(
    () => gameVersions.find(({ value }) => value === gameVersion),
    [gameVersion],
  );

  // Calculate dropdown options based on the provided pokemon data
  const dropdownOptions = useMemo(() => {
    if (!pokemon) return [];

    // @ts-expect-error: invalid type from pokenode-ts
    const gameEntries = new Set(pokemon.flavor_text_entries.map(({ version }) => version.name));

    return gameVersions.filter(({ value }) => gameEntries.has(value));
  }, [pokemon]);

  // Ensure the selected gameVersion is valid and update it if necessary
  useMemo(() => {
    if (dropdownOptions.length > 0 && !dropdownOptions.some(game => game.value === gameVersion)) {
      setGameVersion(dropdownOptions[0].value);
    }
  }, [dropdownOptions, gameVersion]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      gameVersion: gameVersion as GameValue,
      gameGeneration: mapGameValueToGenerationValue(gameVersion as GameValue)!,
      setGameVersion,
      dropdownOptions,
      gameDetails,
    }),
    [gameVersion, dropdownOptions, gameDetails],
  );

  return <GameVersionContext.Provider value={contextValue}>{children}</GameVersionContext.Provider>;
};

export default GameVersionProvider;
