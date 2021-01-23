import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
// helpers
import { removeDash } from '../../../../helpers/typography'
import { mapGeneration } from '../../../../helpers/gameVersion'
// components
import Box from '../../../Box'
import Image from '../../../Image'
import EvoDetails from './EvolutionDetails'
// styles
import { PokeBox, NumberId, PokeName } from '../../../BaseStyles'
import { EvoArrow, PokeGen } from './StyledEvolution'

export default function Evolution({
  noArrow = false,
  species,
  details,
  ...rest
}) {
  // species state
  const [currSpecies, setCurrSpecies] = useState()
  const [imgSrc, setImgSrc] = useState()

  // ref
  const isMounted = useRef(null)
  // mounted effect
  useEffect(() => {
    // executed when component mounted
    isMounted.current = true
    return () => {
      // executed when unmount
      isMounted.current = false
    }
  }, [])

  // fetch species.url data
  useEffect(() => {
    // get data
    axios.get(species.url).then(newSpecies => {
      // only update states if mounted
      if (isMounted.current) {
        setCurrSpecies(newSpecies.data)
        setImgSrc(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${newSpecies.data.id}.png`
        )
      }
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
            <Box width="auto" flexGrow>
              {details.map((currDetails, i) => (
                <EvoDetails key={`evo-details-${i}`} details={currDetails} />
              ))}
              <EvoArrow />
            </Box>
          )}
          {/** Pokemon box with image and types */}
          <Link as={`/pokemon/${species.name}`} href="/pokemon/[id]" passHref>
            <PokeBox forwardedAs="a" grow={false} width="auto" dark>
              <Image
                alt={species.name}
                src={imgSrc}
                height={115}
                iconHeight="75%"
              />
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
