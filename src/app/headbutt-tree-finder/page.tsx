'use client';

import { useEffect, useState } from 'react';
// helpers
import { GameVersionProvider } from '@/context';
import { useSearchParams } from 'next/navigation';
// components
import { HeadbuttLocationsPage } from '@/PageComponents';

export interface PokestatsHeadbuttLocationsPageProps {
  defaultLocation: string | null;
}

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
