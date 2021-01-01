// redux
import { useDispatch, useSelector } from 'react-redux'
import { changeVersion } from './gameSlice'
// next
import Link from 'next/link'
// styled
import Box from '../Box'
import { Heading, SelectContainer } from './styledHeader'
// Info
import { gameVersions } from '../../helpers/gameVersion'

export default function HeaderComponent() {
  // dispatch
  const dispatch = useDispatch()
  // game version
  const gameVersion = useSelector(state => state.game.version)

  return (
    <Box as="header" margin="0 0 1rem" withGutter>
      <Box constrained align="flex-start" margin="auto" padding="2rem 0 0">
        <Link href="/">
          <Heading>PokeStats</Heading>
        </Link>
        {/** Select */}
        <SelectContainer direction="row" justify="flex-start">
          <span>Game Version:</span>
          <select
            value={gameVersion}
            onChange={e => dispatch(changeVersion(e.target.value))}
          >
            {gameVersions.map(({ name, value }, index) => (
              <option key={index} value={value}>
                {name}
              </option>
            ))}
          </select>
        </SelectContainer>
      </Box>
    </Box>
  )
}
