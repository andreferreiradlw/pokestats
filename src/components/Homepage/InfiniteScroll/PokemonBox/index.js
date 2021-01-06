import { useRouter } from 'next/router'
import { forwardRef } from 'react'
// helpers
import { removeDash } from '../../../../helpers/typography'
// components

// styles
import { PokeBox, PokeImg, NumberId, PokeName } from './StyledPokemonBox'

const PokemonBox = forwardRef(({ pokemon, ...rest }, ref) => {
  const { name, id } = pokemon

  const router = useRouter()

  const handleClick = e => {
    e.preventDefault()
    router.push(`/pokemon/${name}`)
  }

  return (
    <PokeBox
      sizes={{ xxs: 5.4, xs: 5.4, sm: 4, md: 3, lg: 2, xl: 1.5 }}
      ref={ref}
      onMouseUp={handleClick}
      {...rest}
    >
      <PokeImg
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      />
      <NumberId>{`#${id}`}</NumberId>
      <PokeName>{removeDash(name)}</PokeName>
    </PokeBox>
  )
})

export default PokemonBox
