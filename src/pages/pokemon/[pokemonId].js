import Pokemon from '../../components/Pokemon'

export default function PokemonPage({ pokemonName }) {
  return <Pokemon pokemonName={pokemonName} />
}

export async function getStaticPaths() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=809')
  const pokemonList = await res.json()
  // paths
  const paths = pokemonList.results.map(pokemon => {
    return {
      params: {
        pokemonId: pokemon.name,
      },
    }
  })
  // return static paths
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // optional
  // we can fetch the type data and pass as props to page
  // const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`)
  // const pokemonData = await res.json()
  const pokemonName = params.pokemonId
  // Pass type data to the page via props
  return { props: { pokemonName } }
}
