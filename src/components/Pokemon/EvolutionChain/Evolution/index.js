import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
// helpers
import { removeDash } from '../../../../helpers/typography'
// component
import Box from '../../../Box'
// styles
import { PokeBox, PokeImg, NumberId, PokeName } from './StyledEvolution'

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
          {!noArrow && <div>--></div>}
          {/** Pokemon box with image and types */}
          <PokeBox width="auto" onMouseUp={handleClick}>
            <PokeImg
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currSpecies.id}.png`}
            />
            <NumberId>{`#${currSpecies.id}`}</NumberId>
            <PokeName>{removeDash(currSpecies.name)}</PokeName>
          </PokeBox>
        </Box>
      )}
    </>
  )
}
