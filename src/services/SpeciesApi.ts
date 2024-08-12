import MainClient from './MainClient';

export const SpeciesApi = {
  getById: async (id: number) => await MainClient.pokemon.getPokemonSpeciesById(id),

  getByIds: async (ids: Array<number>) =>
    await Promise.all(ids.map(id => MainClient.pokemon.getPokemonSpeciesById(id))),
};
