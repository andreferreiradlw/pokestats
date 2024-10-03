import type { GetServerSideProps } from 'next';
import type { Pokemon, PokemonType, MoveType } from '@/types';
import { fetchAutocompleteData } from '@/helpers';
import type { PokestatsEggGroupOption, PokestatsItemOption, PokestatsRegion } from '@/hooks';

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
  allItemsData: PokestatsItemOption[],
  allEggGroupsData: PokestatsEggGroupOption[],
): string => {
  const urls = [
    ...routes.map(route => toUrl(host, route)),
    ...regionList.map(region => toUrl(host, `/regions/${region.generation}/${region.name}`, '0.9')),
    ...pokemonList.map(pokemon => toUrl(host, `/pokemon/${pokemon.name}`)),
    ...pokemonTypes.map(type => toUrl(host, `/type/${type.name}`, '0.8')),
    ...movesList.map(move => toUrl(host, `/move/${move.name}`, '0.9')),
    ...allItemsData.map(item => toUrl(host, `/item/${item.name}`, '0.8')),
    ...allEggGroupsData.map(item => toUrl(host, `/egg-group/${item.name}`, '0.8')),
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

  // static pages
  const routes = ['', '/headbutt-tree-finder', '/items', '/berries', '/moves'];

  try {
    const {
      allMovesData,
      allPokemonData,
      allTypesData,
      allRegionsData,
      allItemsData,
      allEggGroupsData,
    } = await fetchAutocompleteData();

    if (!allPokemonData || !allTypesData || !allMovesData || !allItemsData || !allEggGroupsData) {
      return { notFound: true };
    }

    const sitemap = createSitemap(
      host,
      routes,
      allRegionsData,
      allPokemonData,
      allTypesData,
      allMovesData,
      allItemsData,
      allEggGroupsData,
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
