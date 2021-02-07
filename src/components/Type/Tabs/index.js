import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
// helpers
import { hoverVariant, removeDash, fadeInUpVariant } from '../../../helpers'
// styles
import { Button, SectionTitle } from '../../BaseStyles'
// components
import Box from '../../Box'
import InfiniteScroll from '../../InfiniteScroll'
import Moves from './Moves'

const TabContainer = styled(motion.div)`
  width: 100%;
`

export default function Tabs({ ...rest }) {
  // tab state
  const [currTab, setCurrTab] = useState('pokemon')
  // type selector
  const typeInfo = useSelector(state => state.type)
  // data
  const { name, pokemonListWithId, moves } = typeInfo.data

  return (
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <Box
        direction="row"
        justify="space-evenly"
        flexWrap="wrap"
        margin="0 0 1rem"
      >
        <Button
          active={currTab === 'pokemon'}
          onClick={() => setCurrTab('pokemon')}
          whileHover="hover"
          whileTap="tap"
          variants={hoverVariant}
          key="type-pokemon-btn"
        >
          Pokemon
        </Button>
        <Button
          active={currTab === 'moves'}
          onClick={() => setCurrTab('moves')}
          whileHover="hover"
          whileTap="tap"
          variants={hoverVariant}
          key="type-moves-btn"
        >
          Moves
        </Button>
      </Box>
      <AnimatePresence exitBeforeEnter>
        {!typeInfo.isLoading && currTab === 'pokemon' && (
          <TabContainer
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key={`${name}-type-pokemon`}
          >
            <SectionTitle>{`${removeDash(name)} Type Pokemon (${
              pokemonListWithId.length
            })`}</SectionTitle>
            <InfiniteScroll pokemonList={pokemonListWithId} dark />
          </TabContainer>
        )}
        {!typeInfo.isLoading && currTab === 'moves' && (
          <TabContainer
            initial="hidden"
            animate="show"
            exit="exit"
            variants={fadeInUpVariant}
            key={`${name}-type-moves`}
          >
            <SectionTitle>{`${removeDash(name)} Type Moves (${
              moves.length
            })`}</SectionTitle>{' '}
            <Moves />
          </TabContainer>
        )}
      </AnimatePresence>
    </Box>
  )
}
