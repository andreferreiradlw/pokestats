import Pokemon from '../../components/Pokemon'

export default function PokemonPage({ pokemonName }) {
  return <Pokemon pokemonName={pokemonName} />
}

export async function getServerSideProps({ params }) {
  const pokemonName = params.pokemonId

  return { props: { pokemonName } }
}
