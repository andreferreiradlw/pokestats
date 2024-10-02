// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { EggGroup, Pokemon, PokemonSpecies } from 'pokenode-ts';
// helpers
import { EggGroupApi, PokemonApi, SpeciesApi } from '@/services';
// components
import Seo from '@/components/Seo';
import LayoutV2 from '@/components/LayoutV2';
import EggGroupPage from '@/components/EggGroupPage';
import { getResourceId } from '@/helpers';

export type EggGroupTableData = Partial<Pokemon> & Partial<PokemonSpecies>;

export interface PokestatsEggGroupPageProps {
  eggGroups: string[];
  eggGroupData: EggGroup;
  tableData: EggGroupTableData[];
}

const PokestatsEggGroupPage: NextPage<PokestatsEggGroupPageProps> = props => {
  console.log(props);

  return (
    <>
      <Seo title="EggGroup" description="" />
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
    fallback: 'blocking',
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

    const pokemonIds = eggGroupData.pokemon_species.map(({ url }) => getResourceId(url));

    const [speciesData, pokemonData] = await Promise.all([
      SpeciesApi.getByIds(pokemonIds),
      PokemonApi.getByIds(pokemonIds),
    ]);

    // Joining the data
    const tableData: EggGroupTableData[] = pokemonData
      .map(obj1 => {
        const obj2 = speciesData.find(obj2 => obj2.id === obj1.id);
        return { ...obj1, ...obj2 };
      })
      .filter(
        entry => (entry.id >= 1 && entry.id <= 807) || (entry.id >= 10001 && entry.id <= 10157),
      );

    return {
      props: {
        eggGroups: eggGroupNames.sort((a, b) => a.localeCompare(b)),
        eggGroupData,
        tableData,
      },
    };
  } catch (error) {
    console.error('Error fetching egg group data:', error);
    return { notFound: true };
  }
};

export default PokestatsEggGroupPage;
