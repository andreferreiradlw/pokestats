// types
import type { Metadata } from 'next';
// helpers
import { removeDash } from '@/helpers';
// data
import { kantoZones } from '@/components/pages/RegionsPages/generation-ii/gen2KantoJohtoZones';
// components
import { KantoJohtoGen2 } from '@/PageComponents';

export interface PokestatsRegionsPageProps {
  location: string | null;
}

export function generateMetadata(): Metadata {
  const zones = kantoZones.map(({ key }) => `pokemon ${removeDash(key)} map`);

  return {
    title: 'Kanto & Johto Interactive Pokémon Map - Generation II',
    description:
      'Explore the Kanto region from Generation I of the Pokémon series. Discover key locations and Pokémon encounters, featuring Pokémon from the original games like Red, Blue, and Yellow.',
    keywords: [
      'kanto pokemon map',
      'kanto generation i',
      'kanto generation i map',
      'kanto pokemon areas',
      'kanto pokemon encounters',
      ...zones,
    ],
    openGraph: {
      images: [
        {
          url: 'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/maps/generation-ii/map.png',
        },
      ],
    },
  };
}

const PokestatsRegionsPage = ({ searchParams }: { searchParams: { location?: string } }) => {
  const location = searchParams.location ?? null;

  return <KantoJohtoGen2 location={location} />;
};

export default PokestatsRegionsPage;
