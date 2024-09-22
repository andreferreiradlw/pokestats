import type { GetServerSideProps } from 'next';
import type { Pokemon, PokemonType, MoveType } from '@/types';
import { fetchAutocompleteData } from '@/helpers';
import type { PokestatsRegion } from '@/hooks';

const toUrl = (host: string, route: string, priority = '1.0'): string => `
  <url>
    <loc>${`https://${host}${route}`}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;

const createSitemap = (
  host: string,
  routes: string[],
  regionList: PokestatsRegion[],
  pokemonList: Pokemon[],
  pokemonTypes: PokemonType[],
  movesList: MoveType[],
): string => {
  const urls = [
    ...routes.map(route => toUrl(host, route)),
    ...regionList.map(region => toUrl(host, `/regions/${region.generation}/${region.name}`, '0.9')),
    ...pokemonList.map(pokemon => toUrl(host, `/pokemon/${pokemon.name}`)),
    ...pokemonTypes.map(type => toUrl(host, `/type/${type.name}`, '0.8')),
    ...movesList.map(move => toUrl(host, `/move/${move.name}`, '0.9')),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join('')}
  </urlset>`;
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { req, res } = context;
  const host = req.headers.host;

  // Return 404 if host is not available
  if (!host) {
    return { notFound: true };
  }

  const routes = ['', '/headbutt-tree-finder'];

  try {
    const { allMovesData, allPokemonData, allTypesData, allRegionsData } =
      await fetchAutocompleteData();

    if (!allPokemonData || !allTypesData || !allMovesData) {
      return { notFound: true };
    }

    const sitemap = createSitemap(
      host,
      routes,
      allRegionsData,
      allPokemonData,
      allTypesData,
      allMovesData,
    );

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default function Sitemap() {
  return null; // Rendering logic is handled on the server-side.
}
