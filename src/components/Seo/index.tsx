import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  twitterCardType?: 'summary' | 'summary_large_image';
  siteName?: string;
  authorName?: string;
  keywords?: string;
  datePublished?: string;
  dateModified?: string;
  children?: React.ReactNode;
}

const PokestatsPageTitle = 'PokeStats.gg - The Pokédex powered by PokeApi';

const Seo = ({
  title,
  description = 'PokeStats.gg is an online encyclopedia of Pokémon species containing information such as Pokédex entries, descriptions, abilities, evolution chains, moves learned, stats and much more!',
  image = '/static/pokestats_logo.png',
  type = 'website',
  twitterCardType = 'summary_large_image',
  siteName = 'Pokestats.gg',
  authorName = 'Andre Ferreira',
  keywords = "pokemon, Pokémon, stats, pokedex, Pokédex, pokestats, poke stats, pokestats gg, database, pokeapi, moves, abilities, evolutions, locations, Pokestats, Pokémon, Pocket Monsters, Pokémon Sun, Pokémon Moon, Pokémon Ultra Sun, Pokémon Ultra Moon, Pokémon GO, Pokémon Let's Go Pikachu, Pokémon Let's Go Eevee, Pokemon Anime, Anime, TCG, Pokémon TCG",
  datePublished,
  dateModified,
  children,
}: SeoProps): JSX.Element => {
  const router = useRouter();

  // Get the host and construct the full URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://pokestats.gg';
  const fullUrl = `${baseUrl}${router.asPath}`;

  // format title
  const pageTitle = title ? `${title} - Pokestats.gg` : PokestatsPageTitle;

  return (
    <Head>
      {process.env.NEXT_PUBLIC_ENV_VAR === 'prod_deployment' && (
        <>
          <script defer data-domain="pokestats.gg" src="/js/script.js" />
          <Script id="plausible-script">{`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}</Script>
        </>
      )}
      {/* Primary Meta Tags */}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <title>{pageTitle}</title>

      {/* Favicon and Icons */}
      <link href="/manifest.json" rel="manifest" />
      <link rel="icon" href="/static/favicon.ico" />
      <link href="/static/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
      <link href="/static/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
      <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/static/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={`@${siteName.replace(/\s+/g, '').toLowerCase()}`} />
      <meta name="twitter:creator" content={`@${authorName.replace(/\s+/g, '').toLowerCase()}`} />

      {/* Windows and Other Platform Meta Tags */}
      <meta name="msapplication-navbutton-color" content="red" />
      <meta name="msapplication-TileColor" content="blue" />
      <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png" />
      <meta name="msapplication-config" content="browserconfig.xml" />
      <meta name="theme-color" content="black" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="PokeStats" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="application-name" content="PokeStats" />
      <meta name="msapplication-tooltip" content="Online encyclopedia of Pokémon species." />
      <meta name="msapplication-starturl" content="/" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="full-screen" content="yes" />
      <meta name="browsermode" content="application" />
      <meta name="nightmode" content="enable" />
      <meta name="layoutmode" content="standard" />
      <meta name="imagemode" content="force" />
      <meta name="screen-orientation" content="portrait" />

      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'article' ? 'Article' : 'WebPage',
            name: pageTitle,
            description,
            url: fullUrl,
            image: {
              '@type': 'ImageObject',
              url: image,
            },
            author: {
              '@type': 'Person',
              name: authorName,
            },
            publisher: {
              '@type': 'Organization',
              name: siteName,
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/static/pokestats_logo.png`, // Adjust the logo path as needed
              },
            },
            datePublished: datePublished || new Date().toISOString(),
            dateModified: dateModified || new Date().toISOString(),
          }),
        }}
      />

      {children}
    </Head>
  );
};

export default Seo;
export { PokestatsPageTitle };
