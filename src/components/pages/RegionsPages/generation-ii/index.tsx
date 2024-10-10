// types
import type { PokestatsRegionsPageProps } from '@/app/regions/generation-i/kanto/page';
// data
import { kantoZones } from './gen2KantoJohtoZones';
// components
import RegionPage from '@/components/RegionPage';
import { Typography } from '@mui/material';

const KantoJohtoGen2 = ({ location }: PokestatsRegionsPageProps): JSX.Element => (
  <RegionPage
    areas={kantoZones}
    generation="generation-ii"
    regionName="Kanto"
    mapImageUrl="https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/maps/generation-ii/map.png"
    defaultLocation={location}
  >
    <Typography gutterBottom>test</Typography>
  </RegionPage>
);

export default KantoJohtoGen2;
