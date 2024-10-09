// types
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
// components
import Providers from './providers';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'Pokestats.gg - Pokémon Dex',
    template: '%s - Pokestats.gg',
  },
  description:
    'PokeStats.gg is your ultimate online Pokémon encyclopedia, featuring comprehensive information on Pokémon species, Pokédex entries, abilities, evolution chains, moves, stats, and more.',
  twitter: {
    card: 'summary_large_image',
  },
  keywords: [
    'pokestats',
    'pokestat',
    'poke stats',
    'poke stat',
    'pokedex',
    'pokemon dex',
    'pokemon stats',
    'poke gg',
    'pokemon db',
  ],
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>
      <head>
        {process.env.NEXT_PUBLIC_ENV_VAR === 'prod' && (
          <Script
            async
            defer
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="lazyOnload"
          />
        )}
      </head>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
