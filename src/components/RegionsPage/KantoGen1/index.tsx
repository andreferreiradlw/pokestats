// types
import type { PokestatsKantoGen1PageProps } from '@/pages/regions/kanto-gen1';

const KantoGen1 = ({
  locations,
}: Omit<PokestatsKantoGen1PageProps, 'autocompleteList'>): JSX.Element => {
  console.log('locations', locations);

  return <div>KantoGen1</div>;
};

export default KantoGen1;
