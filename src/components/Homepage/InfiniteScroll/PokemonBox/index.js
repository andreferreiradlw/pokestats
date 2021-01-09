import { forwardRef } from 'react'
import Link from 'next/link'
// helpers
import { removeDash } from '../../../../helpers/typography'
// components

// styles
import { PokeBox, PokeImg, NumberId, PokeName } from './StyledPokemonBox'

const PokemonBox = forwardRef(({ pokemon, ...rest }, ref) => {
  const { name, id } = pokemon

  return (
    <Link as={`/pokemon/${name}`} href="/pokemon/[id]" passHref>
      <PokeBox forwardedAs="a" ref={ref} {...rest}>
        <PokeImg
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        />
        <NumberId>{`#${id}`}</NumberId>
        <PokeName>{removeDash(name)}</PokeName>
      </PokeBox>
    </Link>
  )
})

export default PokemonBox
