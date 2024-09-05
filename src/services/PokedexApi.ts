import type { PokemonSpecies } from 'pokenode-ts';
import MainClient from './MainClient';
import { getResourceId } from '@/helpers';

export const PokedexApi = {
  getNamesBySpecies: async (species: PokemonSpecies) => {
    // Fetch every pokedex in parallel
    const responses = await Promise.all(
      species.pokedex_numbers.map(({ pokedex }) =>
        MainClient.game.getPokedexById(getResourceId(pokedex.url)),
      ),
    );

    // Process the responses and return version group names
    return responses.flatMap(({ version_groups }) => version_groups.map(({ name }) => name));
  },
};
