import Link from 'next/link'
import { useSelector, shallowEqual } from 'react-redux'

export default function Homepage() {
  const pokemonList = useSelector(
    (state) => state.home.pokemonList,
    shallowEqual
  )
  const loadingStatus = useSelector((state) => state.home.status)

  return (
    <main>
      {loadingStatus === 'idle' &&
        pokemonList.map((e, index) => (
          <div key={index}>
            <Link as={`/pokemon/${e.name}`} href="/pokemon/[id]">
              <a>Navigate to {e.name}'s page</a>
            </Link>
          </div>
        ))}
    </main>
  )
}
