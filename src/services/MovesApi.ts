import type { MoveTarget } from 'pokenode-ts';
import MainClient from './MainClient';

export const MovesApi = {
  getAllNames: async () =>
    await MainClient.move.listMoves(0, 721).then(({ results }) => results.map(({ name }) => name)),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.move.getMoveByName(name))),

  getByName: async (name: string) => await MainClient.move.getMoveByName(name),

  getById: async (id: number) => await MainClient.move.getMoveById(id),

  getTargetById: async (id: number) => await MainClient.move.getMoveTargetById(id),

  listMoves: async (from: number, to: number) => await MainClient.move.listMoves(from, to),

  getMoveData: async (moveName: string) => {
    if (moveName === 'pound') {
      return await MovesApi.getById(1);
    }
    return await MovesApi.getByName(moveName);
  },

  getMoveTarget: async (targetId: number) => {
    const targetData = await MovesApi.getTargetById(targetId);

    // Use type assertion with Partial to allow deletion
    delete (targetData as Partial<MoveTarget>).moves;

    targetData.descriptions = targetData.descriptions.filter(
      ({ language }) => language.name === 'en',
    );

    return targetData;
  },
};
