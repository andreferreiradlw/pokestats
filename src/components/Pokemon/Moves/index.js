import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Moves() {
  // pokemon info
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // data
  const { moves } = pokemonInfo.data
  // moves data state
  const [pokemonMoves, setMoves] = useState()

  // fetch move data
  useEffect(() => {
    if (moves.length) {
      // requests array
      const axiosRequests = []

      const fetchTypeData = requests => {
        axios
          .all(requests)
          .then(
            axios.spread((...responses) => {
              const movesData = responses.map((response, i) => {
                let responseData = response.data
                // version details from pokemon moves info
                responseData.version_group_details =
                  moves[i].version_group_details
                // return
                return responseData
              })
              console.log('move data', movesData)
              // set moves state
              setMoves(movesData)
            })
          )
          .catch(errors => {
            // react on errors.
            console.log('error', errors)
          })
      }
      // create an axios request for each move
      moves.forEach(({ move }) => {
        axiosRequests.push(axios.get(move.url))
      })
      // fetch requests
      fetchTypeData(axiosRequests)
    }
  }, [moves])

  return <div>Moves Section</div>
}
