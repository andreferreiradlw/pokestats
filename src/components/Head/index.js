import { default as NextHead } from 'next/head'
import { useSelector } from 'react-redux'
// helpers
import { removeDash } from '../../helpers/typography'

export default function Heading() {
  // pokemon selector
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // data
  const { name } = pokemonInfo.data

  return (
    <NextHead>
      {/** MUST */}
      <meta charset="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=10,user-scalable=yes"
      />
      <meta
        name="description"
        content="PokeStats.gg is an online encyclopedia of Pokémon species containing information such as Pokédex entries, descriptions, evolution chains, moves, stats and much more. It also works offline!"
      />
      <meta
        name="keywords"
        content="pokemon, pokedex, pokestats, react, nextjs, styled-components, pokeapi"
      />
      <title>{name && `${removeDash(name)} - `}PokeStats</title>
      <link rel="canonical" href="https://pokestats.gg" />
      {/** MANIFEST */}
      <link href="/manifest.json" rel="manifest" />
      {/** ICONS */}
      <link rel="icon" href="/favicon.ico" />
      <link
        href="/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      {/** WINDOWS */}
      <meta name="msapplication-navbutton-color" content="red" />
      <meta name="msapplication-TileColor" content="blue" />
      <meta name="msapplication-TileImage" content="mstile-150x150.png" />
      <meta name="msapplication-config" content="browserconfig.xml" />
      {/** ANDROID */}
      <meta name="theme-color" content="black" />
      <meta name="mobile-web-app-capable" content="yes" />
      {/** IOS */}
      <meta name="apple-mobile-web-app-title" content="PokeStats" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      {/** Pinned Sites */}
      <meta name="application-name" content="PokeStats" />
      <meta name="msapplication-tooltip" content="Pin Me" />
      <meta name="msapplication-starturl" content="/" />
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
      {/** GOOGLE FONTS */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
    </NextHead>
  )
}
