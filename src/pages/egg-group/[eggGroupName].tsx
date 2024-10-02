// types
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { EggGroup, Pokemon } from 'pokenode-ts';
// helpers
import { EggGroupApi, PokemonApi } from '@/services';
// components
import Seo from '@/components/Seo';
import LayoutV2 from '@/components/LayoutV2';
import EggGroupPage from '@/components/EggGroupPage';
import { getResourceId } from '@/helpers';

export interface PokestatsEggGroupPageProps {
  eggGroups: string[];
  eggGroupData: EggGroup;
  pokemonData: Pokemon[];
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

    const pokemonData = await PokemonApi.getByIds(pokemonIds);

    return {
      props: {
        eggGroups: eggGroupNames.sort((a, b) => a.localeCompare(b)),
        eggGroupData,
        pokemonData,
      },
    };
  } catch (error) {
    console.error('Error fetching egg group data:', error);
    return { notFound: true };
  }
};

export default PokestatsEggGroupPage;
