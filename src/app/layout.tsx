// types
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
// helpers
import { SpeedInsights } from '@vercel/speed-insights/next';
// components
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    default: 'Pokestats.gg - Your Complete Pokémon Encyclopedia',
    template: '%s - Pokestats.gg',
  },
  description:
    'PokeStats.gg is your ultimate online Pokémon encyclopedia, featuring comprehensive information on Pokémon species, Pokédex entries, abilities, evolution chains, moves, stats, and more.',
  twitter: {
    card: 'summary_large_image',
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <Providers>
        {children}
        <SpeedInsights />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
