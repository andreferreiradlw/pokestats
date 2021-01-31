import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
// helpers
import { removeDash } from '../../../../helpers/typography'
import { mapGeneration } from '../../../../helpers/gameVersion'
import { fadeInUpVariant } from '../../../../helpers/animations'
// components
import BoxWrapper from '../../../Box/StyledBox'
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
  const _isMounted = useRef(null)
  // manage mounted state to avoid memory leaks
  useEffect(() => {
    _isMounted.current = true
    return () => {
      _isMounted.current = false
      setImgSrc(null)
    }
  }, [])

  // fetch species.url data
  useEffect(() => {
    async function fetchImage() {
      // get data
      await axios.get(species.url).then(newSpecies => {
        // only update states if mounted
        if (_isMounted.current) {
          setCurrSpecies(newSpecies.data)
          setImgSrc(
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${newSpecies.data.id}.png`
          )
        }
      })
    }
    // fetch if mounted
    if (_isMounted.current && species) fetchImage()
  }, [species])

  return (
    <>
      {currSpecies && imgSrc && (
        <BoxWrapper
          direction={{ xxs: 'column', lg: 'row' }}
          width={{ xxs: 'auto', lg: '100%' }}
          margin={{ xxs: '0 auto 1rem', lg: 'auto' }}
          initial="hidden"
          animate="show"
          variants={fadeInUpVariant}
          key={`evo-details-container-${species.name}`}
          {...rest}
        >
          {/** Arrow with evolution details */}
          {!noArrow && (
            <BoxWrapper
              width="auto"
              flexGrow
              direction="column"
              flexWrap="nowrap"
              justify="center"
              align="center"
            >
              {details.map((currDetails, i) => (
                <EvoDetails key={`evo-details-${i}`} details={currDetails} />
              ))}
              <EvoArrow />
            </BoxWrapper>
          )}
          {/** Pokemon box with image and types */}
          <Link as={`/pokemon/${species.name}`} href="/pokemon/[id]" passHref>
            <PokeBox
              forwardedAs="a"
              grow={false}
              dark
              whileHover="hover"
              whileTap="tap"
              variants={fadeInUpVariant}
              key={`evolution-${species.name}`}
            >
              <Image
                alt={species.name}
                key={`evolution-img-${species.name}-${imgSrc}`}
                src={imgSrc}
                width={115}
                height={115}
                notLazy
              />
              <NumberId>{`#${currSpecies.id}`}</NumberId>
              <PokeName>{removeDash(currSpecies.name)}</PokeName>
              {currSpecies.generation.name && (
                <PokeGen>{mapGeneration(currSpecies.generation.name)}</PokeGen>
              )}
            </PokeBox>
          </Link>
        </BoxWrapper>
      )}
    </>
  )
}
