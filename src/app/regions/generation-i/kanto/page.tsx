// types
import type { Metadata } from 'next';
// components
import { KantoGen1 } from '@/PageComponents';

export interface PokestatsRegionsPageProps {
  location: string | null;
}

export const metadata: Metadata = {
  title: 'Kanto Interactive Pokémon Map - Generation I',
  description:
    'Explore the Kanto region from Generation I of the Pokémon series. Discover key locations and Pokémon encounters, featuring Pokémon from the original games like Red, Blue, and Yellow.',
};

const PokestatsRegionsPage = ({ searchParams }: { searchParams: { location?: string } }) => {
  const location = searchParams.location ?? null;

  return <KantoGen1 location={location} />;
};

export default PokestatsRegionsPage;
