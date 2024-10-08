// types
import type { Move } from 'pokenode-ts';
import type { Metadata } from 'next';
// helpers
import { MovesApi, TypesApi } from '@/services';
import { capitalise } from '@/helpers';
import { notFound } from 'next/navigation';
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

export const metadata: Metadata = {
  title: 'Pokémon Move Dex - Browse All Pokémon Moves',
  description:
    'Explore the complete list of all Pokémon moves, including details on move types, effects, power, and accuracy.',
  keywords: [
    'pokemon moves',
    'pokemon dex moves',
    'pokestats moves',
    'pokemon db moves',
    'pokemondb moves',
    'pokemon move list',
    'pokemon all moves',
    'pokemon moves list',
  ],
};

const PokestatsMovesPage = async () => {
  try {
    // Fetch the moves and types data
    const genMovesList = await MovesApi.listMoves(0, 937).then(({ results }) =>
      results.map(({ name }) => name),
    );

    if (!genMovesList) {
      notFound();
    }

    const [genMovesData, typesData] = await Promise.all([
      MovesApi.getByNames(genMovesList),
      TypesApi.getAll(),
    ]);

    if (!genMovesData || !typesData) {
      notFound();
    }

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
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default PokestatsMovesPage;
