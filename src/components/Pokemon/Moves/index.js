import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
// helpers
import { mapVersionToGroup } from '../../../helpers/gameVersion'
// components
import Box from '../../Box'
// styles
import { SectionTitle } from '../StyledPokemon'
import { MovesTable, TabContainer, Tab, Content } from './StyledMoves'

export default function Moves({ ...rest }) {
  // pokemon info
  const pokemonInfo = useSelector(state => state.pokemon.info)
  // moves data
  const { moves } = pokemonInfo.data
  // game version
  const gameVersion = useSelector(state => state.game.version)

  // moves data state
  const [pokemonMoves, setMoves] = useState()
  // tab state
  const [activeTab, setActiveTab] = useState(1)

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

  return (
    <Box align={{ sm: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Move Pool</SectionTitle>
      {/** TABS */}
      <TabContainer direction="row" justify="space-evenly">
        <Tab active={activeTab === 1} onClick={() => setActiveTab(1)}>
          Level Up
        </Tab>
        <Tab active={activeTab === 2} onClick={() => setActiveTab(2)}>
          TM / HM
        </Tab>
        <Tab active={activeTab === 3} onClick={() => setActiveTab(3)}>
          Egg
        </Tab>
        <Tab active={activeTab === 4} onClick={() => setActiveTab(4)}>
          Tutor
        </Tab>
      </TabContainer>
      {/** TABLE */}
      <MovesTable forwardedAs="table" align="flex-start">
        <thead>
          <tr>
            <th>Level</th>
            <th>Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Power</th>
            <th>PP</th>
            <th>Acuracy</th>
            <th>Priority</th>
            <th>Generation</th>
          </tr>
        </thead>
        {pokemonMoves && activeTab === 1 && <Content></Content>}
        {pokemonMoves && activeTab === 2 && <Content></Content>}
        {pokemonMoves && activeTab === 3 && <Content></Content>}
        {pokemonMoves && activeTab === 4 && <Content></Content>}
      </MovesTable>
    </Box>
  )
}
