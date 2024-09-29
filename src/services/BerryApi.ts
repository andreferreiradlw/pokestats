import MainClient from './MainClient';

export const BerryApi = {
  getAllNames: async () =>
    await MainClient.berry
      .listBerries(0, 64)
      .then(({ results }) => results.map(({ name }) => name)),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.berry.getBerryByName(name))),

  getByName: async (name: string) => await MainClient.berry.getBerryByName(name),
};
