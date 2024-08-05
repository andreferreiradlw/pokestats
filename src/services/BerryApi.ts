import MainClient from './MainClient';

export const BerryApi = {
  getAll: async () => (await MainClient.berry.listBerries(0, 64)).results.map(berry => berry.name),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.berry.getBerryByName(name))),
};
