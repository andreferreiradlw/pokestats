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
const getIdFromItem = (url: string): number => {
  const matchId = url.match(/\/item\/(\d+)\//);
  return Number(matchId[1]);
};

const getIdFromURL = (url: string, matcher: string): number => {
  const regex = new RegExp(`\\/${matcher}\\/(\\d+)\\/`);
  const matchId = url.match(regex);
  return Number(matchId?.[1]);
};

/**
 * Retrieves the resource ID from a given URL.
 *
 * @param url - The URL from which to extract the resource ID.
 * @return The extracted resource ID.
 */
const getResourceId = (url: string) => {
  const regex = /\/(\d+)\/$/;
  const matchResult = regex.exec(url);
  return Number(matchResult?.[1]);
};

export {
  getIdFromEvolutionChain,
  getIdFromMachine,
  getIdFromSpecies,
  getIdFromMove,
  getIdFromPokemon,
  getIdFromURL,
  getIdFromItem,
  getResourceId,
};
