import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
// helpers
import { removeDash } from '../../../../helpers/typography'
import { mapGeneration } from '../../../../helpers/gameVersion'
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
  PokeGen,
} from './StyledEvolution'

export default function Evolution({
  noArrow = false,
  species,
  details,
  ...rest
}) {
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

  return (
    <>
      {currSpecies && imgSrc && (
        <Box
          direction={{ xxs: 'column', lg: 'row' }}
          margin="0 0 1rem"
          {...rest}
        >
          {/** Arrow with evolution details */}
          {!noArrow && (
            <Box width="auto">
              {details.map((currDetails, i) => (
                <EvoDetails key={i} details={currDetails} />
              ))}
              <EvoArrow />
            </Box>
          )}
          {/** Pokemon box with image and types */}
          <Link as={`/pokemon/${species.name}`} href="/pokemon/[id]" passHref>
            <PokeBox forwardedAs="a" grow={false} width="auto">
              <PokeImg src={imgSrc} />
              <NumberId>{`#${currSpecies.id}`}</NumberId>
              <PokeName>{removeDash(currSpecies.name)}</PokeName>
              {currSpecies.generation.name && (
                <PokeGen>{mapGeneration(currSpecies.generation.name)}</PokeGen>
              )}
            </PokeBox>
          </Link>
        </Box>
      )}
    </>
  )
}
