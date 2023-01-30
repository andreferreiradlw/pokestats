// types
import type { PokestatsKantoGen1PageProps } from '@/pages/regions/kanto-gen1';

const KantoGen1 = ({
  region,
  locations,
  locationAreas,
}: PokestatsKantoGen1PageProps): JSX.Element => {
  // console.log('region', region);
  // console.log('locations', locations);
  console.log('locationAreas', locationAreas);

  return <div>KantoGen1</div>;
};

export default KantoGen1;
