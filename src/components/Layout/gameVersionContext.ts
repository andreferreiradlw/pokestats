import { createContext } from 'react';

const GameVersionContext = createContext({
  gameVersion: '',
  setGameVersion: (version: string) => {},
});

export default GameVersionContext;
