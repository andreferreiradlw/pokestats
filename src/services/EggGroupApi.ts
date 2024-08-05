import MainClient from './MainClient';

export const EggGroupApi = {
  getAll: async () =>
    (await MainClient.pokemon.listEggGroups(0, 64)).results.map(group => group.name),

  getByName: async (name: string) => await MainClient.pokemon.getEggGroupByName(name),

  getByNames: async (names: Array<string>) => {
    const responses = await Promise.all(
      names.map(name => MainClient.pokemon.getEggGroupByName(name)),
    );
    return responses.map(group => {
      const { pokemon_species } = group;
      const reducedSpecies = pokemon_species.filter(({ url }) => url);
      return {
        ...group,
        pokemon_species: reducedSpecies,
      };
    });
  },
};
