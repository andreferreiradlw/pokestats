import { forwardRef } from 'react'
import Link from 'next/link'
// helpers
import { removeDash } from '../../../helpers/typography'
// styles
import { PokeBox, NumberId, PokeName } from '../../BaseStyles'
import Image from '../../Image'

const PokemonBox = forwardRef(({ pokemon, dark, ...rest }, ref) => {
  // data from prop
  const { name, id } = pokemon

  return (
    <Link as={`/pokemon/${name}`} href="/pokemon/[id]" passHref>
      <PokeBox forwardedAs="a" ref={ref} dark={dark} {...rest}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          crossorigin="anonymous"
          alt={name}
          pixelated
          height="115px"
        />
        <NumberId>{`#${id}`}</NumberId>
        <PokeName>{removeDash(name)}</PokeName>
      </PokeBox>
    </Link>
  )
})

PokemonBox.displayName = 'PokemonBox'

export default PokemonBox
