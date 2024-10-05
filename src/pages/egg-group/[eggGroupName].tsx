// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { EggGroup, Pokemon, PokemonSpecies } from 'pokenode-ts';
// helpers
import { EggGroupApi, PokemonApi, SpeciesApi } from '@/services';
// components
import Seo from '@/components/Seo';
import LayoutV2 from '@/components/LayoutV2';
import EggGroupPage from '@/components/EggGroupPage';
import { findEnglishName, getResourceId } from '@/helpers';

export type EggGroupTableData = Partial<Pokemon> & Partial<PokemonSpecies>;

export interface PokestatsEggGroupPageProps {
  eggGroups: string[];
  eggGroupData: EggGroup;
  tableData: EggGroupTableData[];
}

const PokestatsEggGroupPage: NextPage<PokestatsEggGroupPageProps> = props => {
  // SEO
  const pageTitle = `${findEnglishName(props.eggGroupData.names)} Egg Group - Pokémon Species, Abilities, Hatch Cycles & More`;
  const pageDescription = `View detailed information for all Pokémon species in the ${findEnglishName(props.eggGroupData.names)} Egg Group. This table includes Pokémon IDs, names, types, egg groups, abilities, hatch cycles, growth rates, gender ratios, habitats, and more.`;
  const pageKeywords = `Pokémon ${findEnglishName(props.eggGroupData.names)} Egg Group, Pokémon species data, Pokémon abilities, Pokémon hatch cycles, Pokémon growth rates, Pokémon gender ratios, Pokémon habitats, Pokémon types, Pokémon egg groups, Pokémon breeding information`;

  return (
    <>
      <Seo title={pageTitle} description={pageDescription} keywords={pageKeywords} />
      <LayoutV2 withHeader customKey="egg-group-name">
        <EggGroupPage {...props} />
      </LayoutV2>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const groupsList = await EggGroupApi.getAllGroupNames();

  const paths = groupsList.map(group => ({
    params: { eggGroupName: group },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PokestatsEggGroupPageProps> = async ({ params }) => {
  const eggGroupName = params?.eggGroupName as string;

  try {
    const [eggGroupNames, eggGroupData] = await Promise.all([
      EggGroupApi.getAllGroupNames(),
      EggGroupApi.getByName(eggGroupName),
    ]);

    if (!eggGroupNames || !eggGroupData) {
      return { notFound: true };
    }

    const speciesIdList = eggGroupData.pokemon_species.map(({ url }) => getResourceId(url));

    const [speciesData, pokemonData] = await Promise.all([
      SpeciesApi.getByIds(speciesIdList),
      PokemonApi.getByIds(speciesIdList),
    ]);

    // Joining the data
    const tableData: EggGroupTableData[] = pokemonData.map(obj1 => {
      const obj2 = speciesData.find(obj2 => obj2.id === obj1.id);
      return { ...obj1, ...obj2 };
    });

    return {
      props: {
        eggGroups: eggGroupNames.sort((a, b) => a.localeCompare(b)),
        eggGroupData,
        tableData,
        speciesData,
        pokemonData,
      },
    };
  } catch (error) {
    console.error('Error fetching egg group data:', error);
    return { notFound: true };
  }
};

export default PokestatsEggGroupPage;
