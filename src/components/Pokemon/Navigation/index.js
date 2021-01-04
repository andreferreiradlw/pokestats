import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
// components
import Box from '../../Box'
// styles
import { NavBtn } from './StyledNavigation'

export default function Navigation({ ...rest }) {
  // pokemon selector
  const pokemonInfo = useSelector(state => state.pokemon.info)
  const pokemonLength = useSelector(state => state.home.pokemonLength)
  // data
  const { id } = pokemonInfo.data

  return (
    <Box direction="row" justify="space-between" {...rest}>
      {id !== 1 && (
        <Link as={`/pokemon/${id - 1}`} href="/pokemon/[id]">
          <NavBtn>Previous</NavBtn>
        </Link>
      )}
      {id !== pokemonLength && (
        <Link as={`/pokemon/${id + 1}`} href="/pokemon/[id]">
          <NavBtn right>Next</NavBtn>
        </Link>
      )}
    </Box>
  )
}
