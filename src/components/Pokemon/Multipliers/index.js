import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
// helpers
import getMultipliers from './damage_multipliers'
// components
import Loading from '../../Loading'
import Box from '../../Box'
// styles
import { SectionTitle, Table, Numbered } from '../StyledPokemon'

export default function Weaknesses({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // data
  const { types } = pokemonInfo.data

  // loading state
  const [typeLoading, setTypeLoading] = useState(true)
  // weakness initial state
  const [typeMultipliers, setMultipliers] = useState({})

  useEffect(() => {
    if (types.length) {
      let currTypes = types.map(currType => {
        return currType.type.name
      })
      //
      const multipliers = getMultipliers(currTypes)
      console.log(multipliers)

      setMultipliers(multipliers)

      setTypeLoading(false)
    }
  }, [types])

  return (
    <Box align={{ sm: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Multipliers</SectionTitle>
      {typeLoading && !typeMultipliers ? (
        <Loading />
      ) : (
        <>
          <Table forwardedAs="table" align="flex-start">
            <tbody></tbody>
          </Table>
        </>
      )}
    </Box>
  )
}
