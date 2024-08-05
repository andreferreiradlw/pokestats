import MainClient from './MainClient';

export const EvolutionApi = {
  getById: async (id: number) => await MainClient.evolution.getEvolutionChainById(id),
};
