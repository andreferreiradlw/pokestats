import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
// helpers
import { removeDash } from '../../../../helpers/typography'
// components
import Box from '../../../Box'
// styles
import {
  PokeBox,
  PokeImg,
  NumberId,
  PokeName,
  EvoArrow,
} from './StyledEvolution'

export default function Evolution({
  noArrow = false,
  species,
  details,
  ...rest
}) {
  // console.log('details', details)

  // router
  const router = useRouter()

  const handleClick = e => {
    e.preventDefault()
    router.push(`/pokemon/${species.name}`)
  }

  // species state
  const [currSpecies, setCurrSpecies] = useState()

  // fetch species.url data
  useEffect(() => {
    axios.get(species.url).then(newSpecies => setCurrSpecies(newSpecies.data))
  }, [species])

  useEffect(() => {
    console.log('species', currSpecies)
  }, [currSpecies])

  return (
    <>
      {currSpecies && (
        <Box direction="row" {...rest}>
          {/** Arrow with evolution details */}
          {!noArrow && (
            <Box width="auto">
              <EvoArrow />
            </Box>
          )}
          {/** Pokemon box with image and types */}
          <PokeBox width="auto" onMouseUp={handleClick}>
            <PokeImg
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currSpecies.id}.png`}
            />
            <NumberId>{`#${currSpecies.id}`}</NumberId>
            <PokeName>{removeDash(currSpecies.name)}</PokeName>
          </PokeBox>
        </Box>
      )}
    </>
  )
}
