import MainClient from './MainClient';

export const MovesApi = {
  getAllNames: async () => (await MainClient.move.listMoves(0, 721)).results.map(move => move.name),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.move.getMoveByName(name))),

  getByName: async (name: string) => await MainClient.move.getMoveByName(name),
};
