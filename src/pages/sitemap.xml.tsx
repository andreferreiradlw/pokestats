// types
import type { GetServerSideProps } from 'next';
// helpers
import { PokemonClient, MoveClient, NamedAPIResource } from 'pokenode-ts';

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
  pokemonList: NamedAPIResource[],
  pokemonTypes: NamedAPIResource[],
  movesList: NamedAPIResource[],
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
  // clients
  const pokemonClient = new PokemonClient();
  const moveClient = new MoveClient();
  // fixed routes
  const routes = [''];

  try {
    const [
      { results: allPokemonDataResults },
      { results: allTypesDataResults },
      { results: allMovesDataResults },
    ] = await Promise.all([
      pokemonClient.listPokemons(0, 905),
      pokemonClient.listTypes(),
      moveClient.listMoves(0, 850),
    ]);

    if (!allPokemonDataResults || !allTypesDataResults || !allMovesDataResults) {
      return { notFound: true };
    }

    // sitemap
    const sitemap = createSitemap(
      req.headers.host,
      routes,
      allPokemonDataResults,
      allTypesDataResults,
      allMovesDataResults,
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
