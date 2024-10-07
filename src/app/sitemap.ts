import type { MetadataRoute } from 'next';
// helpers
import { fetchSitemapData } from '@/helpers';

const toSitemapEntry = (host: string, route: string): MetadataRoute.Sitemap[0] => ({
  url: `https://${host}${route}`,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_ENV_VAR === 'prod_deployment' ? 'pokestats.gg' : 'localhost';

  // Static pages
  const staticRoutes = ['', '/headbutt-tree-finder', '/items', '/berries', '/moves'];

  try {
    const {
      allMovesData,
      allPokemonData,
      allTypesData,
      allRegionsData,
      allItemsData,
      allEggGroupsData,
    } = await fetchSitemapData();

    if (!allPokemonData || !allTypesData || !allMovesData || !allItemsData || !allEggGroupsData) {
      return [];
    }

    // Create the array of sitemap entries
    const sitemapEntries: MetadataRoute.Sitemap = [
      ...staticRoutes.map(route => toSitemapEntry(host, route)),
      ...allPokemonData.map(pokemon => toSitemapEntry(host, `/pokemon/${pokemon.name}`)),
      ...allPokemonData.map(pokemon => toSitemapEntry(host, `/sprites/${pokemon.name}`)),
      ...allTypesData.map(type => toSitemapEntry(host, `/type/${type.name}`)),
      ...allMovesData.map(move => toSitemapEntry(host, `/move/${move.name}`)),
      ...allItemsData.map(item => toSitemapEntry(host, `/item/${item.name}`)),
      ...allEggGroupsData.map(item => toSitemapEntry(host, `/egg-group/${item.name}`)),
      ...allRegionsData.map(region =>
        toSitemapEntry(host, `/regions/${region.generation}/${region.name}`),
      ),
    ];

    return sitemapEntries;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
}
