// types
import type { Move } from 'pokenode-ts';
// helpers
import { MovesApi, TypesApi } from '@/services';
import { capitalise } from '@/helpers';
// components
import { MovesListPage } from '@/PageComponents';

export interface PokestatsMovesPageProps {
  moves: Move[];
  typeOptions: {
    value: string;
    label: string;
  }[];
}

const PokestatsMovesPage = async () => {
  // Fetch the moves and types data
  const genMovesList = await MovesApi.listMoves(0, 937).then(({ results }) =>
    results.map(({ name }) => name),
  );

  const [genMovesData, typesData] = await Promise.all([
    MovesApi.getByNames(genMovesList),
    TypesApi.getAll(),
  ]);

  const typeOptions = typesData.map(({ name }) => ({ label: capitalise(name), value: name }));

  const props: PokestatsMovesPageProps = {
    moves: genMovesData,
    typeOptions: [{ label: 'All', value: 'all' }, ...typeOptions],
  };

  return <MovesListPage {...props} />;
};

export default PokestatsMovesPage;
