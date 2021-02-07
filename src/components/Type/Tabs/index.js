import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// helpers
import { hoverVariant, removeDash } from '../../../helpers'
// styles
import { Button, SectionTitle } from '../../BaseStyles'
// components
import Box from '../../Box'
import InfiniteScroll from '../../InfiniteScroll'
import Moves from './Moves'

export default function Tabs({ ...rest }) {
  // tab state
  const [currTab, setCurrTab] = useState('pokemon')
  // pokemon list
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
      {!typeInfo.isLoading && currTab === 'pokemon' && (
        <>
          <SectionTitle>{`${removeDash(name)} Type Pokemon (${
            pokemonListWithId.length
          })`}</SectionTitle>
          <InfiniteScroll pokemonList={pokemonListWithId} dark />
        </>
      )}
      {!typeInfo.isLoading && currTab === 'moves' && (
        <>
          <SectionTitle>{`${removeDash(name)} Type Moves (${
            moves.length
          })`}</SectionTitle>{' '}
          <Moves />
        </>
      )}
    </Box>
  )
}
