import MainClient from './MainClient';

export const EncountersApi = {
  getById: async (id: number) => await MainClient.pokemon.getPokemonLocationAreaById(id),

  getAllMethodDescriptions: async () => {
    const methodPromises = await MainClient.encounter
      .listEncounterMethods(0, 31)
      .then(({ results }) =>
        results.map(({ name }) => MainClient.encounter.getEncounterMethodByName(name)),
      );

    return await Promise.all(methodPromises);
  },
};
