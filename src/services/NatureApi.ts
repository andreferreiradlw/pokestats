import MainClient from './MainClient';

export const NatureApi = {
  getAllNames: async () =>
    await MainClient.pokemon
      .listNatures(0, 25)
      .then(({ results }) => results.map(({ name }) => name)),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.pokemon.getNatureByName(name))),
};
