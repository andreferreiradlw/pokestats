import { Type } from 'pokenode-ts';
import MainClient from './MainClient';
import { MovesApi } from './MovesApi';
import { getResourceId } from '@/helpers';

export const TypesApi = {
  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.pokemon.getTypeByName(name))),

  getByName: async (name: string) => await MainClient.pokemon.getTypeByName(name),

  getAll: async () => await MainClient.pokemon.listTypes(0, 18).then(({ results }) => results),

  listTypes: async (from: number, to: number) => await MainClient.pokemon.listTypes(from, to),

  getTypeMoves: async (type: Type) =>
    await Promise.all(type.moves.map(({ url }) => MovesApi.getById(getResourceId(url)))),
};
