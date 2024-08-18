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
};
