import type { GetServerSideProps } from 'next';
import type { Pokemon, PokemonType, MoveType } from '@/types';
import { fetchAutocompleteData } from '@/helpers';

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
  pokemonList: Pokemon[],
  pokemonTypes: PokemonType[],
  movesList: MoveType[],
): string => {
  const urls = [
    ...routes.map(route => toUrl(host, route)),
    ...pokemonList.map(pokemon => toUrl(host, `/pokemon/${pokemon.name}`)),
    ...pokemonTypes.map(type => toUrl(host, `/type/${type.name}`)),
    ...movesList.map(move => toUrl(host, `/move/${move.name}`)),
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

  const routes = [''];

  try {
    const { allMovesData, allPokemonData, allTypesData } = await fetchAutocompleteData();

    if (!allPokemonData || !allTypesData || !allMovesData) {
      return { notFound: true };
    }

    const sitemap = createSitemap(host, routes, allPokemonData, allTypesData, allMovesData);

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
