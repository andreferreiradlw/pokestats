// returns the last value in between slashes from the url
const getIdFromEvolutionChain = (url: string): number => {
  const matchId = url.match(/\/evolution-chain\/(\d+)\//);
  return Number(matchId[1]);
};

const getIdFromMachine = (url: string): number => {
  const matchId = url.match(/\/machine\/(\d+)\//);
  return Number(matchId[1]);
};

const getIdFromSpecies = (url: string): number => {
  const matchId = url.match(/\/pokemon-species\/(\d+)\//);
  return Number(matchId[1]);
};

const getIdFromMove = (url: string): number => {
  const matchId = url.match(/\/move\/(\d+)\//);
  return Number(matchId[1]);
};

const getIdFromPokemon = (url: string): number => {
  const matchId = url.match(/\/pokemon\/(\d+)\//);
  return Number(matchId[1]);
};

const getIdFromURL = (url: string, matcher: string): number => {
  const regex = new RegExp(`\\/${matcher}\\/(\\d+)\\/`);
  const matchId = url.match(regex);
  return Number(matchId?.[1]);
};

export {
  getIdFromEvolutionChain,
  getIdFromMachine,
  getIdFromSpecies,
  getIdFromMove,
  getIdFromPokemon,
  getIdFromURL,
};
