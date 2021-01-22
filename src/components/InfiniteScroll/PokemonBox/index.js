import { forwardRef } from 'react'
import Link from 'next/link'
import LazyLoad from 'react-lazyload'
// helpers
import { removeDash } from '../../../helpers/typography'
// styles
import { PokeBox, PokeImg, NumberId, PokeName } from '../../BaseStyles'

const PokemonBox = forwardRef(({ pokemon, dark, ...rest }, ref) => {
  // data from prop
  const { name, id } = pokemon

  return (
    <Link as={`/pokemon/${name}`} href="/pokemon/[id]" passHref>
      <PokeBox forwardedAs="a" ref={ref} dark={dark} {...rest}>
        <LazyLoad height={115} once offset={100}>
          <PokeImg
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            crossorigin="anonymous"
            alt={name}
            pixelated
          />
        </LazyLoad>
        <NumberId>{`#${id}`}</NumberId>
        <PokeName>{removeDash(name)}</PokeName>
      </PokeBox>
    </Link>
  )
})

PokemonBox.displayName = 'PokemonBox'

export default PokemonBox
