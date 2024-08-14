import MainClient from './MainClient';

export const PokemonApi = {
  getByName: async (name: string) => await MainClient.pokemon.getPokemonByName(name),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(pokemon => MainClient.pokemon.getPokemonByName(pokemon))),

  getByIds: async (ids: Array<number>) =>
    await Promise.all(ids.map(id => MainClient.pokemon.getPokemonById(id))),

  getByOffsetAndLimit: async (offset: number, limit: number) =>
    await MainClient.pokemon.listPokemons(offset, limit),

  getFormsByIds: async (numbers: Array<string>) =>
    await Promise.all(numbers.map(id => MainClient.pokemon.getPokemonFormById(Number(id)))),

  listPokemons: async (from: number, to: number) => await MainClient.pokemon.listPokemons(from, to),
};
