import { useState, useEffect } from 'react'
// helpers
import { hoverVariant } from '../../../helpers'
// styles
import { Button } from '../../BaseStyles'
// components
import Box from '../../Box'

export default function Tabs({ ...rest }) {
  const [currTab, setCurrTab] = useState('pokemon')

  useEffect(() => {
    console.log(currTab)
  }, [currTab])

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
    </Box>
  )
}
