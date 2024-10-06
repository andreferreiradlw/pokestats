// types
import type { Move } from 'pokenode-ts';
// helpers
import { MovesApi, TypesApi } from '@/services';
import { capitalise } from '@/helpers';
// components
import { MovesListPage } from '@/PageComponents';

export interface PartialMove {
  damage_class: Move['damage_class'];
  generation: Move['generation'];
  id: Move['id'];
  type: Move['type'];
  pp: Move['pp'];
  power: Move['power'];
  accuracy: Move['accuracy'];
  name: Move['name'];
  level_learned_at: number;
  priority: Move['priority'];
  effect_entries: Move['effect_entries'];
}

export interface PokestatsMovesPageProps {
  moves: PartialMove[];
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

  const formattedMoves = genMovesData.map(
    ({
      damage_class,
      generation,
      id,
      type,
      pp,
      power,
      accuracy,
      name,
      // @ts-expect-error: incorrect types
      level_learned_at,
      priority,
      effect_entries,
    }) => ({
      damage_class,
      generation,
      id,
      type,
      pp,
      power,
      accuracy,
      name,
      level_learned_at,
      priority,
      effect_entries,
    }),
  );

  const props: PokestatsMovesPageProps = {
    moves: formattedMoves,
    typeOptions: [{ label: 'All', value: 'all' }, ...typeOptions],
  };

  return <MovesListPage {...props} />;
};

export default PokestatsMovesPage;
