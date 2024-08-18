import MainClient from './MainClient';

export const GrowthRateApi = {
  getAllData: async () => {
    const growthRatePromises = await MainClient.pokemon
      .listGrowthRates()
      .then(({ results }) =>
        results.map(({ name }) => MainClient.pokemon.getGrowthRateByName(name)),
      );

    return await Promise.all(growthRatePromises);
  },
};
