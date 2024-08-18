import React, { createContext, useState, useEffect, useMemo } from 'react';
// helpers
import { checkIfEarlierGen, Game, gameVersions, mapGenerationToGame } from '@/helpers';
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
  const [dropdownOptions, setDropdownOptions] = useState<Game[]>([]);

  const currGame = useMemo(
    () => (pokemon ? mapGenerationToGame(pokemon.generation.name, pokemon.id) : null),
    [pokemon],
  );

  const currPokemonVersions = useMemo(
    () =>
      currGame ? gameVersions.filter(version => !checkIfEarlierGen(currGame, version.value)) : [],
    [currGame],
  );

  // Update dropdown options and set the initial game version
  useEffect(() => {
    if (currPokemonVersions.length > 0) {
      setDropdownOptions(currPokemonVersions);

      // If the current gameVersion is not in the dropdown options, set it to the first available option
      if (!currPokemonVersions.some(game => game.value === gameVersion)) {
        setGameVersion(currPokemonVersions[0].value);
      }
    } else {
      setDropdownOptions([]);
      setGameVersion(''); // Reset if there are no valid versions
    }
  }, [currPokemonVersions, gameVersion]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({ gameVersion, setGameVersion, dropdownOptions }),
    [gameVersion, dropdownOptions],
  );

  return <GameVersionContext.Provider value={contextValue}>{children}</GameVersionContext.Provider>;
};

export default GameVersionProvider;
