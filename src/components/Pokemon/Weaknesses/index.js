import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
// components
import Loading from '../../Loading'
import Box from '../../Box'
// styles
import { SectionTitle, Table, Numbered } from '../StyledPokemon'

export default function Weaknesses({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector((state) => state.pokemon.info)
  // data
  const { types } = pokemonInfo.data

  // fetch type data
  useEffect(() => {
    // requests array
    const axiosRequests = []

    const fetchTypeData = (requests) => {
      axios
        .all(requests)
        .then(
          axios.spread((...responses) => {
            console.log('responses', responses)
          })
        )
        .catch((errors) => {
          // react on errors.
          console.log('error', errors)
        })
    }

    if (types.length) {
      types.forEach(({ type }) => {
        axiosRequests.push(axios.get(type.url))
      })
      // fetch
      fetchTypeData(axiosRequests)
    }
  }, [types])

  return (
    <>
      {pokemonInfo.isLoading ? (
        <Loading />
      ) : (
        <Box align={{ sm: 'center', lg: 'flex-start' }} {...rest}>
          <SectionTitle>Weaknesses</SectionTitle>
        </Box>
      )}
    </>
  )
}
