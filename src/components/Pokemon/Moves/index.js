import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
// helpers
import { mapVersionToGroup } from '../../../helpers/gameVersion'

export default function Moves() {
  // pokemon info
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // moves data
  const { moves } = pokemonInfo.data
  // game version
  const gameVersion = useSelector(state => state.game.version)

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
  }, [])

  useEffect(() => {
    if (gameVersion) {
      console.log(gameVersion, mapVersionToGroup(gameVersion))
    }
  }, [gameVersion])

  return <div>Moves Section</div>
}
