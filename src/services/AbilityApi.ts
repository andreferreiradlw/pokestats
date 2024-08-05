import MainClient from './MainClient';

export const AbilityApi = {
  getAllNames: async () => {
    const response = await MainClient.pokemon.listAbilities(0, 233);
    return response.results.map(ability => ability.name);
  },
  getByName: async (name: string) => await MainClient.pokemon.getAbilityByName(name),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.pokemon.getAbilityByName(name))),
};
