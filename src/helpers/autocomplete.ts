// types
import type { Pokemon, PokemonType, MoveType } from '@/types';
// helpers
import { MoveClient, PokemonClient } from 'pokenode-ts';
import { removeDuplicateMoves } from './moves';
import { getResourceId } from './getIdFromUrl';

export interface AutocompleteListType {
  allPokemonData: Pokemon[];
  allTypesData: PokemonType[];
  allMovesData: MoveType[];
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
  ] = await Promise.all([
    pokemonClient.listPokemons(0, 905),
    pokemonClient.listTypes(0, 18),
    moveClient.listMoves(0, 850),
  ]);

  const pokemonData = allPokemonDataResults.map((currPokemon, i) => ({
    ...currPokemon,
    id: i + 1,
    assetType: 'pokemon',
  }));

  const typesData = allTypesDataResults.map((currType, i) => ({
    ...currType,
    id: i + 1,
    assetType: 'type',
  }));

  const movesData = removeDuplicateMoves(allMovesDataResults).map(currMove => ({
    ...currMove,
    id: getResourceId(currMove.url),
    assetType: 'move',
  }));

  return {
    allPokemonData: pokemonData as Pokemon[],
    allTypesData: typesData as PokemonType[],
    allMovesData: movesData as MoveType[],
  };
};

export { fetchAutocompleteData };
