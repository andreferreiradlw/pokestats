import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { AnimatePresence } from 'framer-motion'
// helpers
import {
  mapVersionToGroup,
  mapGeneration,
  fetchTypeData,
  filterMoves,
  getMachineNames,
  capitalize,
  removeDash,
  staggerTableVariant,
  fadeInRightVariant,
  fadeInUpVariant,
} from '../../../helpers'
// components
import Box from '../../Box'
import Loading from '../../Loading'
import TypeBadge from '../../TypeBadge'
// styles
import { SectionTitle, SectionMessage, Button } from '../../BaseStyles'
import {
  TableContainer,
  MovesTable,
  NameTH,
  NameTD,
  TableRow,
  TabContainer,
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
  const _isMounted = useRef(null)
  // manage mounted state to avoid memory leaks
  useEffect(() => {
    _isMounted.current = true
    return () => {
      _isMounted.current = false
    }
  }, [])

  // fetch move data
  useEffect(() => {
    if (_isMounted.current && moves && moves.length) {
      setMovesLoading(true)
      // fetch
      fetchTypeData(moves)
        .then(movesData => {
          if (_isMounted.current) setMoves(movesData)
        })
        .catch(errors => {
          console.log(errors)
          // no moves
          if (_isMounted.current) setMovesLoading(false)
        })
    }
  }, [moves])

  // tab changes
  useEffect(() => {
    if (_isMounted.current) {
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
    if (_isMounted.current && pokemonMoves && learnMethod && gameVersion) {
      // filter moves by learn method and current game version
      filterMoves(
        pokemonMoves,
        learnMethod,
        mapVersionToGroup(gameVersion)
      ).then(moves => {
        if (_isMounted.current) {
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
        }
      })
    }
  }, [pokemonMoves, learnMethod, gameVersion])

  // current pokemon moves
  useEffect(() => {
    if (_isMounted.current && currMoves.length) {
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
            if (_isMounted.current) {
              // update machine names state
              setMachineNames(names)
              // stop loading
              setMovesLoading(false)
            }
          })
        )
      } else {
        // if not machine just stop loading instead
        if (_isMounted.current) setMovesLoading(false)
      }
    }
  }, [currMoves])

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Move Pool</SectionTitle>
      {/** TABS */}
      <TabContainer direction="row" justify="space-evenly" flexWrap="wrap">
        <Button
          active={activeTab === 1}
          onClick={() => setActiveTab(1)}
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key="pokemon-moves-lvlup-btn"
        >
          Level Up
        </Button>
        <Button
          active={activeTab === 2}
          onClick={() => setActiveTab(2)}
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key="pokemon-moves-tmhm-btn"
        >
          TM / HM
        </Button>
        <Button
          active={activeTab === 3}
          onClick={() => setActiveTab(3)}
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key="pokemon-moves-egg-btn"
        >
          Egg
        </Button>
        <Button
          active={activeTab === 4}
          onClick={() => setActiveTab(4)}
          whileHover="hover"
          whileTap="tap"
          variants={fadeInUpVariant}
          key="pokemon-moves-tutor-btn"
        >
          Tutor
        </Button>
      </TabContainer>
      <AnimatePresence exitBeforeEnter>
        {/** LOADING */}
        {movesLoading && (
          <Loading
            height="100%"
            iconWidth={{ xxs: '20%', xs: '15%', md: '10%', lg: '5%' }}
            key="pokemon-moves"
          />
        )}
        {/** TABLE */}
        {!movesLoading && currMoves.length && (
          <TableContainer
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key="pokemon-moves-table-container"
          >
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
              <TableBody
                key={`moves-tbody`}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={staggerTableVariant}
              >
                {currMoves.map((move, i) => (
                  <TableRow
                    key={`${move.name}-${i}`}
                    variants={fadeInRightVariant}
                  >
                    {learnMethod === 'level-up' && (
                      <td>{move.level_learned_at}</td>
                    )}
                    {learnMethod === 'machine' &&
                      (machineNames && machineNames[i] ? (
                        <td>{machineNames[i].toUpperCase()}</td>
                      ) : (
                        <td>{<Loading iconWidth="25px" />}</td>
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
        )}
        {/** NO MOVES */}
        {!movesLoading && currMoves.length === 0 && (
          <SectionMessage
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key="pokemon-nomoves-message"
          >
            No moves for currently selected game version.
          </SectionMessage>
        )}
      </AnimatePresence>
    </Box>
  )
}
