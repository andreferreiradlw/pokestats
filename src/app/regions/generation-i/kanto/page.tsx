export const runtime = 'edge';

// types
import type { Metadata } from 'next';
// helpers
import { removeDash } from '@/helpers';
// data
import { kantoZones } from '@/components/pages/RegionsPages/generation-i/kanto/gen1KantoZones';
// components
import { KantoGen1 } from '@/PageComponents';

export interface PokestatsRegionsPageProps {
  location: string | null;
}

export function generateMetadata(): Metadata {
  const zones = kantoZones.map(({ key }) => `pokemon ${removeDash(key)} map`);

  return {
    title: 'Kanto Interactive Pokémon Map - Generation I',
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
          url: 'https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/maps/generation-i/map.png',
        },
      ],
    },
  };
}

const PokestatsRegionsPage = ({ searchParams }: { searchParams: { location?: string } }) => {
  const location = searchParams.location ?? null;

  return <KantoGen1 location={location} />;
};

export default PokestatsRegionsPage;
