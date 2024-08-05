import MainClient from './MainClient';

export const GrowthRateApi = {
  getAllData: async () => {
    const listResponse = await MainClient.pokemon.listGrowthRates();
    const growthRateNames = listResponse.results.map(growthRate => growthRate.name);
    return await Promise.all(
      growthRateNames.map(name => MainClient.pokemon.getGrowthRateByName(name)),
    );
  },
};
