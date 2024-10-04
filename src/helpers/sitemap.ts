// helpers
import { MoveClient, type NamedAPIResource, PokemonClient } from 'pokenode-ts';
import { type PokestatsRegion, regionsData } from '@/hooks';
import { EggGroupApi, ItemApi } from '@/services';
import { unusedItems } from '@/constants';

export interface AutocompleteListType {
  allPokemonData: NamedAPIResource[];
  allTypesData: NamedAPIResource[];
  allMovesData: NamedAPIResource[];
  allRegionsData: PokestatsRegion[];
  allItemsData: NamedAPIResource[];
  allEggGroupsData: NamedAPIResource[];
}

const fetchSitemapData = async (): Promise<AutocompleteListType> => {
  // clients
  const pokemonClient = new PokemonClient();
  const moveClient = new MoveClient();

  // fetch data
  const [
    { results: allPokemonDataResults },
    { results: allTypesDataResults },
    { results: allMovesDataResults },
    { results: allItemsDataResults },
    allEggGroupsDataResults,
  ] = await Promise.all([
    pokemonClient.listPokemons(0, 1302),
    pokemonClient.listTypes(0, 18),
    moveClient.listMoves(0, 937),
    ItemApi.listItems(),
    EggGroupApi.getAllGroupNames(),
  ]);

  const itemsData: NamedAPIResource[] = allItemsDataResults.filter(
    ({ name }) => !unusedItems.includes(name),
  );

  const eggGroupsData: NamedAPIResource[] = allEggGroupsDataResults.map(group => ({
    name: group,
    url: '',
  }));

  return {
    allPokemonData: allPokemonDataResults,
    allTypesData: allTypesDataResults,
    allMovesData: allMovesDataResults,
    allRegionsData: regionsData,
    allItemsData: itemsData,
    allEggGroupsData: eggGroupsData,
  };
};

export { fetchSitemapData };
