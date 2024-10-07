import type { MetadataRoute } from 'next';
// helpers
import { fetchSitemapData } from '@/helpers';

const toSitemapEntry = (host: string, route: string, priority = 1.0): MetadataRoute.Sitemap[0] => ({
  url: `https://${host}${route}`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_ENV_VAR === 'prod_deployment' ? 'pokestats.gg' : 'localhost';

  // Static pages
  const routes = ['', '/headbutt-tree-finder', '/items', '/berries', '/moves'];

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
      ...routes.map(route => toSitemapEntry(host, route)),
      ...allRegionsData.map(region =>
        toSitemapEntry(host, `/regions/${region.generation}/${region.name}`, 0.9),
      ),
      ...allPokemonData.map(pokemon => toSitemapEntry(host, `/pokemon/${pokemon.name}`)),
      ...allTypesData.map(type => toSitemapEntry(host, `/type/${type.name}`, 0.8)),
      ...allMovesData.map(move => toSitemapEntry(host, `/move/${move.name}`, 0.9)),
      ...allItemsData.map(item => toSitemapEntry(host, `/item/${item.name}`, 0.8)),
      ...allEggGroupsData.map(item => toSitemapEntry(host, `/egg-group/${item.name}`, 0.8)),
      ...allPokemonData.map(pokemon => toSitemapEntry(host, `/sprites/${pokemon.name}`, 0.8)),
    ];

    return sitemapEntries;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
}
