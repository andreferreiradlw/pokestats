import type { Pokemon } from 'pokenode-ts';
import MainClient from './MainClient';

export const AbilityApi = {
  getAllNames: async () =>
    await MainClient.pokemon
      .listAbilities(0, 233)
      .then(({ results }) => results.map(ability => ability.name)),

  getByName: async (name: string) => await MainClient.pokemon.getAbilityByName(name),

  getByNames: async (names: Array<string>) =>
    await Promise.all(names.map(name => MainClient.pokemon.getAbilityByName(name))),

  getPokemonAbilities: async (pokemon: Pokemon) => {
    const abilities = pokemon.abilities.map(({ ability }) =>
      MainClient.pokemon.getAbilityByName(ability.name),
    );
    return await Promise.all(abilities);
  },
};
