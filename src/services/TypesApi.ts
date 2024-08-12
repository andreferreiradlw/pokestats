import MainClient from './MainClient';

export const TypesApi = {
  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.pokemon.getTypeByName(name))),

  getByName: async (name: string) => await MainClient.pokemon.getTypeByName(name),

  getAll: async () => (await MainClient.pokemon.listTypes(0, 15)).results.map(type => type.name),
};
