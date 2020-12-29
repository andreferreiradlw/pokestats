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
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // data
  const { types } = pokemonInfo.data

  // loading state
  const [typeLoading, setTypeLoading] = useState(true)
  // weakness initial state
  const [weakness, setWeakness] = useState({
    double_damage_from: [],
    double_damage_to: [],
    half_damage_from: [],
    half_damage_to: [],
    no_damage_from: [],
    no_damage_to: [],
  })

  // fetch type data on load
  useEffect(() => {
    // requests array
    const axiosRequests = []

    const fetchTypeData = requests => {
      axios
        .all(requests)
        .then(
          axios.spread((...responses) => {
            responses
              .map(response => {
                // damage relation for each type
                return response.data.damage_relations
              })
              .forEach(type => {
                // copy old state
                const newWeakness = { ...weakness }
                // for each type, loop relation array
                Object.keys(type).forEach(key => {
                  type[key].forEach(relation => {
                    // check if type already exists in state key
                    if (weakness[key].indexOf(relation.name) === -1) {
                      // if it doesn't, change value
                      newWeakness[key].push(relation.name)
                    }
                  })
                })
                // set new state
                setWeakness(newWeakness)
              })
          })
        )
        .catch(error => {
          // catch errors
          console.log('error', error)
        })
        .finally(
          // change loading state
          setTypeLoading(false)
        )
    }

    if (types.length) {
      // create an axios request for each type
      // push request into array
      types.forEach(({ type }) => {
        axiosRequests.push(axios.get(type.url))
      })
      // fetch
      fetchTypeData(axiosRequests)
    }
  }, [types])

  return (
    <Box align={{ sm: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Weaknesses</SectionTitle>
      {typeLoading ? <Loading /> : <></>}
    </Box>
  )
}
