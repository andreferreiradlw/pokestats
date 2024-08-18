import MainClient from './MainClient';

export const EggGroupApi = {
  getAllGroupNames: async () =>
    await MainClient.pokemon
      .listEggGroups(0, 64)
      .then(({ results }) => results.map(({ name }) => name)),

  getByName: async (name: string) => await MainClient.pokemon.getEggGroupByName(name),

  getByNames: async (names: Array<string>) => {
    // Fetch egg groups in parallel
    const responses = await Promise.all(
      names.map(name => MainClient.pokemon.getEggGroupByName(name)),
    );
    // Process the responses
    return responses.map(group => {
      const { pokemon_species } = group;
      // Filter out species with falsy URLs
      const filteredSpecies = pokemon_species.filter(({ url }) => Boolean(url));

      return {
        ...group,
        pokemon_species: filteredSpecies,
      };
    });
  },
};
