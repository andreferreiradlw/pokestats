import { createContext } from 'react';

const GameVersionContext = createContext({
  gameVersion: null,
  setGameVersion: (version: string) => {},
});

export default GameVersionContext;
