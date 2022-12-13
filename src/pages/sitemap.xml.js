import { typeList } from '../helpers'

const toUrl = (host, route, priority = '0.5') => `
  <url>
    <loc>${`https://${host}${route}`}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>
`

const createSitemap = (
  host,
  routes,
  pokemonList
) => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(route => toUrl(host, route, '1.0'))}
    ${pokemonList.map(pokemon =>
      toUrl(host, `/pokemon/${pokemon.name}`, '0.8')
    )}
    ${typeList.map(type => toUrl(host, `/type/${type.name}`))}
  </urlset>`

const Sitemap = () => {}

Sitemap.getInitialProps = async ({ req, res }) => {
  // fixed routes
  const routes = ['']
  // fetch pokemon list
  const pokeapiRes = await fetch('https://pokeapi.co/api/v2/pokemon?limit=809')
  const pokemonList = await pokeapiRes.json()

  // sitemap
  const sitemap = createSitemap(req.headers.host, routes, pokemonList.results)

  // res
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return res
}

export default Sitemap
