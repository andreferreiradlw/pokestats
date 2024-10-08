// types
import type { EggGroup, Pokemon, PokemonSpecies } from 'pokenode-ts';
import type { Metadata } from 'next';
// helpers
import { EggGroupApi, PokemonApi, SpeciesApi } from '@/services';
import { findEnglishName, getResourceId } from '@/helpers';
import { notFound } from 'next/navigation';
// components
import { EggGroupPage } from '@/PageComponents';

export interface EggGroupTableData {
  name: PokemonSpecies['name'];
  egg_groups: PokemonSpecies['egg_groups'];
  habitat: PokemonSpecies['habitat'];
  hatch_counter: PokemonSpecies['hatch_counter'];
  id: PokemonSpecies['id'];
  forms: Pokemon['forms'];
  sprites: Pokemon['sprites'];
  types: Pokemon['types'];
  abilities: Pokemon['abilities'];
  growth_rate: PokemonSpecies['growth_rate'];
  gender_rate: PokemonSpecies['gender_rate'];
}

export interface PokestatsEggGroupPageProps {
  eggGroups: string[];
  eggGroupData: EggGroup;
  tableData: EggGroupTableData[];
}

interface EggGroupPageParams {
  params: { eggGroupName: string };
}

export async function generateMetadata({
  params: { eggGroupName },
}: EggGroupPageParams): Promise<Metadata> {
  const eggGroupData = await EggGroupApi.getByName(eggGroupName);

  const groupName = findEnglishName(eggGroupData.names);

  return {
    title: `${groupName} Egg Group - Pokémon Species, Abilities, Hatch Cycles & More`,
    description: `View detailed information for all Pokémon species in the ${groupName} Egg Group. This table includes Pokémon IDs, names, types, egg groups, abilities, hatch cycles, growth rates, gender ratios, habitats, and more.`,
    keywords: [
      `${groupName} egg group`,
      `${groupName} pokemon group`,
      `${groupName} pokemon`,
      `${groupName} pokemon egg group`,
      `${groupName} hatch cycles`,
    ],
  };
}

const PokestatsEggGroupPage = async ({ params: { eggGroupName } }: EggGroupPageParams) => {
  try {
    const [eggGroupNames, eggGroupData] = await Promise.all([
      EggGroupApi.getAllGroupNames(),
      EggGroupApi.getByName(eggGroupName),
    ]);

    if (!eggGroupData || !eggGroupNames) {
      notFound();
    }

    const speciesIdList = eggGroupData.pokemon_species.map(({ url }) => getResourceId(url));

    const [speciesData, pokemonData] = await Promise.all([
      SpeciesApi.getByIds(speciesIdList),
      PokemonApi.getByIds(speciesIdList),
    ]);

    if (!speciesData || !pokemonData) {
      notFound();
    }

    const tableData: EggGroupTableData[] = pokemonData
      .map(pokemon => {
        const species = speciesData.find(species => species.id === pokemon.id);

        if (!species) return null;

        return {
          name: species.name,
          egg_groups: species.egg_groups,
          habitat: species.habitat,
          hatch_counter: species.hatch_counter,
          id: species.id,
          forms: pokemon.forms,
          sprites: pokemon.sprites,
          types: pokemon.types,
          abilities: pokemon.abilities,
          growth_rate: species.growth_rate,
          gender_rate: species.gender_rate,
        };
      })
      .filter(group => !!group);

    const props: PokestatsEggGroupPageProps = {
      eggGroups: eggGroupNames.sort((a, b) => a.localeCompare(b)),
      eggGroupData,
      tableData,
    };

    return <EggGroupPage {...props} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export async function generateStaticParams() {
  const groupsList = await EggGroupApi.getAllGroupNames();

  return groupsList.map(group => ({
    eggGroupName: group,
  }));
}

export default PokestatsEggGroupPage;
