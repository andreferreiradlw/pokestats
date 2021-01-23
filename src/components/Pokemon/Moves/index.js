import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
// helpers
import { mapVersionToGroup, mapGeneration } from '../../../helpers/gameVersion'
import {
  fetchTypeData,
  filterMoves,
  getMachineNames,
} from '../../../helpers/moves'
import { capitalize, removeDash } from '../../../helpers/typography'
// components
import Box from '../../Box'
import Loading from '../../Loading'
import TypeBadge from '../../TypeBadge'
// styles
import { SectionTitle, SectionMessage } from '../../BaseStyles'
import {
  TableContainer,
  MovesTable,
  NameTH,
  NameTD,
  TableRow,
  TabContainer,
  Tab,
  TableBody,
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
  const [currMoves, setCurrMoves] = useState([])
  // machine names
  const [machineNames, setMachineNames] = useState()
  // loading
  const [movesLoading, setMovesLoading] = useState(true)

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

  // fetch move data
  useEffect(() => {
    if (isMounted.current) {
      setMovesLoading(true)
      fetchTypeData(moves)
        .then(movesData => {
          setMoves(movesData)
          //setMovesLoading(false)
        })
        .catch(errors => {
          console.log(errors)
          // no moves
          setMovesLoading(false)
        })
    }
  }, [moves])

  // tab changes
  useEffect(() => {
    if (isMounted.current) {
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
    }
  }, [activeTab])

  // current pokemon moves
  useEffect(() => {
    if (isMounted.current && pokemonMoves && learnMethod && gameVersion) {
      // filter moves by learn method and current game version
      filterMoves(
        pokemonMoves,
        learnMethod,
        mapVersionToGroup(gameVersion)
      ).then(moves => {
        if (moves.length) {
          // clear machine names state
          // when we set new currMoves, these won't match
          setMachineNames()
          // update move state to show in table
          setCurrMoves(moves)
          // this will trigger a new machine name search
        } else {
          // empty currMoves
          setCurrMoves([])
          // stop loading
          setMovesLoading(false)
        }
      })
    }
  }, [pokemonMoves, learnMethod, gameVersion])

  // current pokemon moves
  useEffect(() => {
    if (isMounted.current && currMoves.length) {
      // if move is machine then get machine names
      if (learnMethod === 'machine') {
        // requests from current moves machines
        getMachineNames(currMoves).then(
          axios.spread((...responses) => {
            // get machine names from responses
            const names = responses.map(res => {
              // if request fails will return null
              if (res === null) {
                return '❌'
              } else {
                return res.data.item.name
              }
            })
            // update machine names state
            setMachineNames(names)
            // stop loading
            setMovesLoading(false)
          })
        )
      } else {
        // if not machine just stop loading instead
        setMovesLoading(false)
      }
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
                <TableRow key={`${move.name}-${i}`}>
                  {learnMethod === 'level-up' && (
                    <td>{move.level_learned_at}</td>
                  )}
                  {learnMethod === 'machine' &&
                    (machineNames && machineNames[i] ? (
                      <td>{machineNames[i].toUpperCase()}</td>
                    ) : (
                      <td>{<Loading />}</td>
                    ))}
                  {learnMethod === 'egg' && <td>-</td>}
                  {learnMethod === 'tutor' && <td>-</td>}
                  <NameTD>{removeDash(move.name)}</NameTD>
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
      {!movesLoading && currMoves.length === 0 && (
        <SectionMessage>
          No moves for currently selected game version.
        </SectionMessage>
      )}
      {/** LOADING */}
      {movesLoading && (
        <Loading
          height="300px"
          iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
          key="pokemon-moves"
        />
      )}
    </Box>
  )
}
