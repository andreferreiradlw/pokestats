import Box from '../../Box'

import React, { useEffect, useRef } from 'react'

export default function scrollableArea() {
  const lastPokemon = useRef(null)

  // useEffect to run observer only once the component has mounted in order to have access to the browser and consequentially that WEB API. (Next.js is pre-rendering)
  useEffect(() => {
    // Callback for when the element is observed
    const observerCallback = entries => {
      entries.forEach(entry => {
        // console.log(entry)
        entry.isIntersecting && console.log(`Ref is on Screen`)
      })
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    // Sets up the call back and options to where to expect the element
    const observer = new IntersectionObserver(observerCallback, options)

    // calls observer method to run on the element with lastPokemon Ref
    observer.observe(lastPokemon.current)
  }, [])

  return (
    <Box
      style={{ border: 'solid 1px black' }}
      growProp={false}
      height="400px"
      width="400px"
      ref={lastPokemon}
    ></Box>
  )
}
