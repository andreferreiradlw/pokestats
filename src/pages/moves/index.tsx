// types
import type { NextPage, GetStaticProps } from 'next';
import type { Move } from 'pokenode-ts';
// helpers
import { MovesApi, TypesApi } from '@/services';
// components
import LayoutV2 from '@/components/LayoutV2';
import Seo from '@/components/Seo';
import MovesListPage from '@/components/MovesListPage';
import { capitalise } from '@/helpers';

export interface PokestatsMovesPageProps {
  moves: Move[];
  typeOptions: {
    value: string;
    label: string;
  }[];
}

const PokestatsMovesPage: NextPage<PokestatsMovesPageProps> = props => {
  // Define values for SEO
  const seoTitle = `Pokémon Moves List`;

  return (
    <>
      <Seo title={seoTitle} description="" keywords="" />
      <LayoutV2 withHeader customKey="moves-list-page">
        <MovesListPage {...props} />
      </LayoutV2>
    </>
  );
};

export const getStaticProps: GetStaticProps<PokestatsMovesPageProps> = async () => {
  const genMovesList = await MovesApi.listMoves(0, 621).then(({ results }) =>
    results.map(({ name }) => name),
  );

  const genMovesData = await MovesApi.getByNames(genMovesList);

  if (!genMovesData) {
    return { notFound: true };
  }

  const typesData = await TypesApi.getAll();

  if (!typesData) {
    return { notFound: true };
  }

  const typeOptions = typesData.map(({ name }) => ({ label: capitalise(name), value: name }));

  return {
    props: {
      moves: genMovesData,
      typeOptions: [{ label: 'All', value: 'all' }, ...typeOptions],
    },
  };
};

export default PokestatsMovesPage;
