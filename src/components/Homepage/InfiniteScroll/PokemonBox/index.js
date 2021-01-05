import Link from 'next/link'
import { forwardRef } from 'react'
// helpers
import { removeDash } from '../../../../helpers/typography'
// styles
import styled, { css } from 'styled-components'
// components
import Box from '../../../Box'

const PokeBox = styled(Box)`
  background-color: white;
  color: black;
  padding: 1rem 0;
  margin: 0.5rem;
  text-align: center;
`

const PokemonBox = forwardRef(({ pokemon }, ref) => {
  const { name, url, id } = pokemon

  return (
    <PokeBox sizes={1.2} ref={ref}>
      <div>{removeDash(name)}</div>
      <div>{id}</div>
    </PokeBox>
  )
})

export default PokemonBox
