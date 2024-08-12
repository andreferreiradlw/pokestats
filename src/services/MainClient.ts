import { MainClient as MainPokeNodeClient } from 'pokenode-ts';

const MainClient = new MainPokeNodeClient({
  cacheOptions: {
    ttl: Infinity,
  },
});

export default MainClient;
