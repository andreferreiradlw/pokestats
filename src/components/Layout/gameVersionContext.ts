import { createContext } from 'react';

const GameVersionContext = createContext({
  gameVersion: '',
  setGameVersion: (version: string) => version,
});

export default GameVersionContext;
