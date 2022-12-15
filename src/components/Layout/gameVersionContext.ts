import { createContext } from 'react';

const GameVersionContext = createContext({
  gameVersion: 'red',
  setGameVersion: (version: string) => {},
});

export default GameVersionContext;
