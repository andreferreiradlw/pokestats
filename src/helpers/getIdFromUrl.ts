// returns the last value in between slashes from the url
const getIdFromEvolutionChain = (url: string): number => {
  const matchId = url.match(/\/evolution-chain\/(\d+)\//);
  return Number(matchId[1]);
};

const getIdFromMachine = (url: string): number => {
  const matchId = url.match(/\/machine\/(\d+)\//);
  return Number(matchId[1]);
};

export { getIdFromEvolutionChain, getIdFromMachine };