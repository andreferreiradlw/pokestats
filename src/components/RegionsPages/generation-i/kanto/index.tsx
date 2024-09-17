import { PokestatsRegionsPageProps } from '@/pages/regions/generation-i/kanto';
import { kantoZones } from './gen1KantoZones';
// components
import RegionPage from '@/components/RegionPage';

const KantoGen1 = ({ location }: PokestatsRegionsPageProps): JSX.Element => (
  <RegionPage
    areas={kantoZones}
    generation="generation-i"
    regionName="Kanto"
    mapImageUrl="https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/maps/generation-i/map.png"
    defaultLocation={location}
  >
    <b>Kanto</b> is a region of the Pokémon world. It is located east of <b>Johto</b>, which
    together form a joint landmass that is south of <b>Sinnoh</b>. It is the setting of the first
    generation of games and can also be explored in Generations II, III, IV, and VII.
  </RegionPage>
);

export default KantoGen1;
