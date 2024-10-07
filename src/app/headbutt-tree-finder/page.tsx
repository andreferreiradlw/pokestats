// types
import type { Metadata } from 'next';
// helpers
import { GameVersionProvider } from '@/context';
// components
import { HeadbuttLocationsPage } from '@/PageComponents';

export interface PokestatsHeadbuttLocationsPageProps {
  defaultLocation: string | null;
}

export const metadata: Metadata = {
  title: 'Headbutt Tree Calculator - Find Pokémon with Headbutt',
  description:
    'This Headbutt Tree Calculator tool helps you locate Pokémon available through headbutting trees in different Generation II game areas.',
};

const PokestatsHeadbuttLocationsPage = (): JSX.Element => (
  <GameVersionProvider>
    <HeadbuttLocationsPage />
  </GameVersionProvider>
);

export default PokestatsHeadbuttLocationsPage;
