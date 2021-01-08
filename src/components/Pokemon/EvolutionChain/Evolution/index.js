import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
// helpers
import { removeDash } from '../../../../helpers/typography'
// components
import Box from '../../../Box'
import EvoDetails from './EvolutionDetails'
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
  const [imgSrc, setImgSrc] = useState()

  // fetch species.url data
  useEffect(() => {
    // get data
    axios.get(species.url).then(newSpecies => {
      setCurrSpecies(newSpecies.data)
      setImgSrc(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${newSpecies.data.id}.png`
      )
    })
  }, [species])

  useEffect(() => {
    // console.log('evo details', details)
  }, [details])

  return (
    <>
      {currSpecies && imgSrc && (
        <Box direction="row" margin="0 0 1rem" {...rest}>
          {/** Arrow with evolution details */}
          {!noArrow && (
            <Box width="auto" sizes={7}>
              {details.map((currDetails, i) => (
                <EvoDetails key={i} details={currDetails} />
              ))}
              <EvoArrow />
            </Box>
          )}
          {/** Pokemon box with image and types */}
          <PokeBox sizes={5} width="auto" onMouseUp={handleClick}>
            <PokeImg src={imgSrc} />
            <NumberId>{`#${currSpecies.id}`}</NumberId>
            <PokeName>{removeDash(currSpecies.name)}</PokeName>
          </PokeBox>
        </Box>
      )}
    </>
  )
}
