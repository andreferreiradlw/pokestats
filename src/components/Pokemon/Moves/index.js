import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
// helpers
import { mapVersionToGroup, mapGeneration } from '../../../helpers/gameVersion'
import { filterMoves, getMachineNames } from '../../../helpers/moves'
import { capitalize } from '../../../helpers/typography'
// components
import Box from '../../Box'
import Loading from '../../Loading'
import TypeBadge from '../../TypeBadge'
// styles
import { SectionTitle } from '../StyledPokemon'
import {
  TableContainer,
  MovesTable,
  NameTH,
  NameTD,
  TableRow,
  TabContainer,
  Tab,
  TableBody,
  NoMoves,
} from './StyledMoves'

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
  // learn method state
  const [learnMethod, setLearnMethod] = useState()
  // current pokemon moves
  const [currMoves, setCurrMoves] = useState()
  // machine names
  const [machineNames, setMachineNames] = useState()
  // loading
  const [movesLoading, setMovesLoading] = useState(false)

  // fetch move data
  useEffect(() => {
    if (moves.length) {
      setMovesLoading(true)
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
              // set moves state
              setMoves(movesData)
              // stop loading
              setMovesLoading(false)
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

  // tab changes
  useEffect(() => {
    // tab changed! update learn method
    // changing learn method will trigger moves update
    // start loading first
    setMovesLoading(true)
    // update learn method state
    if (activeTab === 1) {
      setLearnMethod('level-up')
    } else if (activeTab === 2) {
      setLearnMethod('machine')
    } else if (activeTab === 3) {
      setLearnMethod('egg')
    } else if (activeTab === 4) {
      setLearnMethod('tutor')
    }
  }, [activeTab])

  // current pokemon moves
  useEffect(() => {
    if (pokemonMoves && learnMethod && gameVersion) {
      // filter moves by learn method and current game version
      filterMoves(
        pokemonMoves,
        learnMethod,
        mapVersionToGroup(gameVersion)
      ).then(moves => {
        // clear machine names state
        // when we set new currMoves, these won't match
        setMachineNames()
        // update move state to show in table
        setCurrMoves(moves)
        // this will trigger a new machine name search
        // no need to stop loading here
      })
    }
  }, [pokemonMoves, learnMethod, gameVersion])

  // current pokemon moves
  useEffect(() => {
    // if move is from machine then get machine names
    if (currMoves && learnMethod === 'machine') {
      // requests from current moves machines
      getMachineNames(currMoves).then(
        axios.spread((...responses) => {
          // get machine names from responses
          const names = responses.map(res => res.data.item.name)
          // update machine names state
          setMachineNames(names)
          // stop loading
          setMovesLoading(false)
        })
      )
    } else {
      // otherwise just stop loading
      setMovesLoading(false)
    }
  }, [currMoves])

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Move Pool</SectionTitle>
      {/** TABS */}
      <TabContainer direction="row" justify="space-evenly" flexWrap="wrap">
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
      <TableContainer>
        <MovesTable>
          <thead>
            <tr>
              <th>{learnMethod === 'level-up' ? 'Level' : '-'}</th>
              <NameTH>Name</NameTH>
              <th>Type</th>
              <th>Category</th>
              <th>Power</th>
              <th>PP</th>
              <th>Accuracy</th>
              <th>Priority</th>
              <th>Generation</th>
            </tr>
          </thead>
          <TableBody>
            {!movesLoading &&
              currMoves &&
              currMoves.map((move, i) => (
                <TableRow key={i}>
                  {learnMethod === 'level-up' && (
                    <td>{move.level_learned_at}</td>
                  )}
                  {learnMethod === 'machine' &&
                    (machineNames ? (
                      <td>{machineNames[i].toUpperCase()}</td>
                    ) : (
                      <td>{<Loading />}</td>
                    ))}
                  {learnMethod === 'egg' && <td>-</td>}
                  {learnMethod === 'tutor' && <td>-</td>}
                  <NameTD>{capitalize(move.name)}</NameTD>
                  <td>
                    <TypeBadge margin="0" iconOnly type={move.type.name} />
                  </td>
                  <td>{capitalize(move.damage_class.name)}</td>
                  <td>{move.power || '-'}</td>
                  <td>{move.pp || '-'}</td>
                  <td>{move.accuracy || '-'}</td>
                  <td>{move.priority}</td>
                  <td>{mapGeneration(move.generation.name)}</td>
                </TableRow>
              ))}
          </TableBody>
        </MovesTable>
      </TableContainer>
      {/** NO MOVES */}
      {currMoves && !currMoves.length && (
        <NoMoves margin="2rem 0">No Moves!</NoMoves>
      )}
      {/** LOADING */}
      {movesLoading && <Loading />}
    </Box>
  )
}
