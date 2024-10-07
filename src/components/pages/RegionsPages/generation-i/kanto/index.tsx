// types
import type { PokestatsRegionsPageProps } from '@/app/regions/generation-i/kanto/page';
// data
import { kantoZones } from './gen1KantoZones';
// components
import RegionPage from '@/components/RegionPage';
import { Typography } from '@mui/material';

const KantoGen1 = ({ location }: PokestatsRegionsPageProps): JSX.Element => (
  <RegionPage
    areas={kantoZones}
    generation="generation-i"
    regionName="Kanto"
    mapImageUrl="https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/maps/generation-i/map.png"
    defaultLocation={location}
  >
    <Typography gutterBottom>
      <b>Kanto</b> is the region where the first-generation games (<b>Pokémon Red, Blue, Green,</b>{' '}
      and <b>Yellow</b>) take place. It features diverse locations like <b>Viridian Forest</b>,{' '}
      <b>Mt. Moon</b>, and the <b>Seafoam Islands</b>. Key locations include:
    </Typography>
    <ul>
      <li>
        <b>Pallet Town</b>: Start your journey and receive your first Pokémon from Professor Oak.
      </li>
      <li>
        <b>Cerulean City</b>: Face Misty, the Water-type Gym Leader.
      </li>
      <li>
        <b>Celadon City</b>: Visit the Game Corner, Department Store, and challenge Gym Leader
        Erika.
      </li>
      <li>
        <b>Saffron City</b>: Battle Sabrina at the Psychic-type Gym and explore the Team Rocket HQ.
      </li>
    </ul>
    <Typography>
      Ready to explore Generation I Kanto? Select a location on the map and discover its Pokémon
      encounters!
    </Typography>
  </RegionPage>
);

export default KantoGen1;
