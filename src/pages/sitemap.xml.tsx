// types
import type { GetServerSideProps } from 'next';
import type { Pokemon, PokemonType, MoveType } from '@/types';
// helpers
import { fetchAutocompleteData } from '@/helpers';

const toUrl = (host: string, route: string, priority = '1.0') => `
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
) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(route => toUrl(host, route))}
    ${pokemonList.map(pokemon => toUrl(host, `/pokemon/${pokemon.name}`))}
    ${pokemonTypes.map(type => toUrl(host, `/type/${type.name}`))}
    ${movesList.map(type => toUrl(host, `/move/${type.name}`))}
  </urlset>`;

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async context => {
  const { req, res } = context;
  // fixed routes
  const routes = [''];

  const { allMovesData, allPokemonData, allTypesData } = await fetchAutocompleteData();

  try {
    if (!allPokemonData || !allTypesData || !allMovesData) {
      return { notFound: true };
    }

    // sitemap
    const sitemap = createSitemap(
      req.headers.host,
      routes,
      allPokemonData,
      allTypesData,
      allMovesData,
    );

    // response
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error(error);
    // redirects to 404 page
    return { notFound: true };
  }
};

export default Sitemap;
