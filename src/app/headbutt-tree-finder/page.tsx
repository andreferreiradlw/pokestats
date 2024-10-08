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
  keywords: [
    'headbutt tree calculator',
    'headbutt pokemon move',
    'pokemon headbutt tree calculator',
    'pokemon silver headbutt tree calculator',
  ],
};

const PokestatsHeadbuttLocationsPage = (): JSX.Element => (
  <GameVersionProvider>
    <HeadbuttLocationsPage />
  </GameVersionProvider>
);

export default PokestatsHeadbuttLocationsPage;
