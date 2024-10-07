'use client';

import { useEffect, useState } from 'react';
// types
import type { Metadata } from 'next';
// helpers
import { GameVersionProvider } from '@/context';
import { useSearchParams } from 'next/navigation';
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

const PokestatsHeadbuttLocationsPage = (): JSX.Element => {
  const searchParams = useSearchParams();
  const [defaultLocation, setDefaultLocation] = useState<string | null>(null);

  useEffect(() => {
    const location = searchParams.get('location');
    setDefaultLocation(location ? location : null);
  }, [searchParams]);

  return (
    <GameVersionProvider>
      <HeadbuttLocationsPage defaultLocation={defaultLocation} />
    </GameVersionProvider>
  );
};

export default PokestatsHeadbuttLocationsPage;
