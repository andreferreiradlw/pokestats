// types
import type { EggGroup, Pokemon, PokemonSpecies } from 'pokenode-ts';
// helpers
import { EggGroupApi, PokemonApi, SpeciesApi } from '@/services';
import { getResourceId } from '@/helpers';
// components
import { EggGroupPage } from '@/PageComponents';

export type EggGroupTableData = Partial<Pokemon> & Partial<PokemonSpecies>;

export interface PokestatsEggGroupPageProps {
  eggGroups: string[];
  eggGroupData: EggGroup;
  tableData: EggGroupTableData[];
}

const PokestatsEggGroupPage = async ({ params }: { params: { eggGroupName: string } }) => {
  const eggGroupName = params.eggGroupName;

  const [eggGroupNames, eggGroupData] = await Promise.all([
    EggGroupApi.getAllGroupNames(),
    EggGroupApi.getByName(eggGroupName),
  ]);

  const speciesIdList = eggGroupData.pokemon_species.map(({ url }) => getResourceId(url));

  const [speciesData, pokemonData] = await Promise.all([
    SpeciesApi.getByIds(speciesIdList),
    PokemonApi.getByIds(speciesIdList),
  ]);

  // Joining the data
  const tableData: EggGroupTableData[] = pokemonData.map(pokemon => {
    const species = speciesData.find(species => species.id === pokemon.id);
    return { ...pokemon, ...species };
  });

  const props: PokestatsEggGroupPageProps = {
    eggGroups: eggGroupNames.sort((a, b) => a.localeCompare(b)),
    eggGroupData,
    tableData,
  };

  return <EggGroupPage {...props} />;
};

export async function generateStaticParams() {
  const groupsList = await EggGroupApi.getAllGroupNames();

  return groupsList.map(group => ({
    eggGroupName: group,
  }));
}

export default PokestatsEggGroupPage;
