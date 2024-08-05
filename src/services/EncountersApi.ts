import MainClient from './MainClient';

export const EncountersApi = {
  getById: async (id: number) => await MainClient.pokemon.getPokemonLocationAreaById(id),

  getAllMethodDescriptions: async () => {
    const listResponse = await MainClient.encounter.listEncounterMethods(0, 31);
    const methodNames = listResponse.results.map(method => method.name);
    return await Promise.all(
      methodNames.map(name => MainClient.encounter.getEncounterMethodByName(name)),
    );
  },
};
