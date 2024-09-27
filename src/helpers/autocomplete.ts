// types
import type { Pokemon, PokemonType, MoveType } from '@/types';
// helpers
import { MoveClient, PokemonClient } from 'pokenode-ts';
import { removeDuplicateMoves } from './moves';
import { getResourceId } from './getIdFromUrl';
import { type PokestatsItemOption, type PokestatsRegion, regionsData } from '@/hooks';
import { ItemApi } from '@/services';
import { unusedItems } from '@/constants';

export interface AutocompleteListType {
  allPokemonData: Pokemon[];
  allTypesData: PokemonType[];
  allMovesData: MoveType[];
  allRegionsData: PokestatsRegion[];
  allItemsData: PokestatsItemOption[];
}

const fetchAutocompleteData = async (): Promise<AutocompleteListType> => {
  // clients
  const pokemonClient = new PokemonClient();
  const moveClient = new MoveClient();

  // fetch data
  const [
    { results: allPokemonDataResults },
    { results: allTypesDataResults },
    { results: allMovesDataResults },
    { results: allItemsDataResults },
  ] = await Promise.all([
    pokemonClient.listPokemons(0, 905),
    pokemonClient.listTypes(0, 18),
    moveClient.listMoves(0, 850),
    ItemApi.listItems(),
  ]);

  const pokemonData: Pokemon[] = allPokemonDataResults.map((currPokemon, i) => ({
    ...currPokemon,
    id: i + 1,
    assetType: 'pokemon',
  }));

  const typesData: PokemonType[] = allTypesDataResults.map((currType, i) => ({
    ...currType,
    id: i + 1,
    assetType: 'type',
  }));

  const movesData: MoveType[] = removeDuplicateMoves(allMovesDataResults).map(currMove => ({
    ...currMove,
    id: getResourceId(currMove.url),
    assetType: 'move',
  }));

  const itemsData: PokestatsItemOption[] = allItemsDataResults
    .filter(({ name }) => !unusedItems.includes(name))
    .map(item => ({
      ...item,
      id: getResourceId(item.url),
      assetType: 'item',
    }));

  return {
    allPokemonData: pokemonData,
    allTypesData: typesData,
    allMovesData: movesData,
    allRegionsData: regionsData,
    allItemsData: itemsData,
  };
};

export { fetchAutocompleteData };
