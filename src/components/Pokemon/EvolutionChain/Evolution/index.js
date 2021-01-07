import { useState, useEffect } from 'react'
// component
import Box from '../../../Box'
// styles
import { PokeBox, PokeImg } from './StyledEvolution'

export default function Evolution({
  noArrow = false,
  species,
  details,
  ...rest
}) {
  console.log('noArrow', noArrow)
  console.log('species', species)
  console.log('details', details)

  // fetch species.url data

  return (
    <Box direction="row">
      {!noArrow && <div>--></div>}
      <PokeBox width="auto">{species.name}</PokeBox>
    </Box>
  )
}
