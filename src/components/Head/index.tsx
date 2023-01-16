import Head from 'next/head';
import Script from 'next/script';

interface PokestatsHeadProps {
  children?: React.ReactNode;
}

const PokestatsPageTitle = 'PokeStats.gg - The Pokédex powered by PokeApi';

const PokestatsHead = ({ children }: PokestatsHeadProps): JSX.Element => {
  return (
    <Head>
      {process.env.NODE_ENV === 'production' && (
        <>
          <script defer data-domain="pokestats.gg" src="https://plausible.io/js/script.js" />
          <Script>{`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}</Script>
        </>
      )}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta
        name="description"
        content="PokeStats.gg is an online encyclopedia of Pokémon species containing information such as Pokédex entries, descriptions, abilities, evolution chains, moves learned, stats and much more!"
      />
      <meta
        name="keywords"
        content="pokemon, Pokémon, stats, pokedex, Pokédex, pokestats, poke stats, pokestats gg, database, pokeapi, moves, abilities, evolutions, locations, Pokestats, Pokémon, Pocket Monsters, Pokémon Sun, Pokémon Moon, Pokémon Ultra Sun, Pokémon Ultra Moon, Pokémon GO, Pokémon Let's Go Pikachu, Pokémon Let's Go Eevee, Pokemon Anime, Anime, TCG, Pokémon TCG"
      />
      <title>{PokestatsPageTitle}</title>
      <meta name="robots" content="max-image-preview:large" />
      {/** FONTS */}
      <link rel="preload" href="/fonts/Montserrat-Regular.ttf" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/Montserrat-Medium.ttf" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/Quicksand-SemiBold.ttf" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/JosefinSans-Bold.ttf" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/JosefinSans-BoldItalic.ttf" as="font" crossOrigin="" />
      {/** MANIFEST */}
      <link href="/manifest.json" rel="manifest" />
      {/** ICONS */}
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
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      {/** Open Graph */}
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      {/** Windows */}
      <meta name="msapplication-navbutton-color" content="red" />
      <meta name="msapplication-TileColor" content="blue" />
      <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png" />
      <meta name="msapplication-config" content="browserconfig.xml" />
      {/** Android */}
      <meta name="theme-color" content="black" />
      <meta name="mobile-web-app-capable" content="yes" />
      {/** IOS */}
      <meta name="apple-mobile-web-app-title" content="PokeStats" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      {/** Pinned Sites */}
      <meta name="application-name" content="PokeStats" />
      <meta name="msapplication-tooltip" content="Online encyclopedia of Pokémon species." />
      <meta name="msapplication-starturl" content="/" />
      {/** Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content="/static/android-icon-512x512.png" />
      {/** Tap highlighting */}
      <meta name="msapplication-tap-highlight" content="no" />
      {/** UC Mobile Browser */}
      <meta name="full-screen" content="yes" />
      <meta name="browsermode" content="application" />
      {/** Disable night mode for this page */}
      <meta name="nightmode" content="enable" />
      {/** Layout mode */}
      <meta name="layoutmode" content="standard" />
      {/** imagemode - show image even in text only mode */}
      <meta name="imagemode" content="force" />
      {/** Orientation */}
      <meta name="screen-orientation" content="portrait" />
      {children}
    </Head>
  );
};

export default PokestatsHead;
export { PokestatsPageTitle };
