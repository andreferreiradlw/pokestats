// types
import type { GetServerSideProps } from 'next';
// helpers
import { PokemonClient, Pokemon, Type } from 'pokenode-ts';

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
  pokemonTypes: Type[],
) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(route => toUrl(host, route))}
    ${pokemonList.map(pokemon => toUrl(host, `/pokemon/${pokemon.name}`))}
    ${pokemonTypes.map(type => toUrl(host, `/type/${type.name}`))}
  </urlset>`;

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async context => {
  const { req, res } = context;

  const api = new PokemonClient();
  // fixed routes
  const routes = [''];

  try {
    const [pokemonData, typesData] = await Promise.all([api.listPokemons(0, 905), api.listTypes()]);

    if (!pokemonData || !typesData) {
      return { notFound: true };
    }

    // sitemap
    const sitemap = createSitemap(
      req.headers.host,
      routes,
      pokemonData.results as unknown as Pokemon[],
      typesData.results as unknown as Type[],
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
