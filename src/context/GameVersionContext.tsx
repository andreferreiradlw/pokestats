import React, { createContext, useState, useMemo } from 'react';
// helpers
import { gameVersions, type Game } from '@/helpers';
// types
import type { PokemonSpecies } from 'pokenode-ts';

interface GameVersionContextProps {
  gameVersion: string;
  setGameVersion: (version: string) => void;
  dropdownOptions: Game[];
}

interface GameVersionProviderProps {
  children: React.ReactNode;
  pokemon?: PokemonSpecies;
}

export const GameVersionContext = createContext<GameVersionContextProps>({
  gameVersion: '',
  setGameVersion: () => {},
  dropdownOptions: [],
});

export const GameVersionProvider = ({ children, pokemon }: GameVersionProviderProps) => {
  const [gameVersion, setGameVersion] = useState<string>('');

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
    () => ({ gameVersion, setGameVersion, dropdownOptions }),
    [gameVersion, dropdownOptions],
  );

  return <GameVersionContext.Provider value={contextValue}>{children}</GameVersionContext.Provider>;
};

export default GameVersionProvider;
