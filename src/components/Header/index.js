// redux
import { useDispatch } from 'react-redux'
import { changeVersion } from './gameSlice'
// next
import Link from 'next/link'
// styled
import Box from '../Box'
import { Heading, SelectContainer } from './styledHeader'

const gameVersions = [
  { name: 'Red', value: 'red' },
  { name: 'Blue', value: 'blue' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Gold', value: 'gold' },
  { name: 'Silver', value: 'silver' },
  { name: 'Crystal', value: 'crystal' },
  { name: 'Ruby', value: 'ruby' },
  { name: 'Sapphire', value: 'sapphire' },
  { name: 'Emerald', value: 'emerald' },
  { name: 'Fire Red', value: 'firered' },
  { name: 'Leaf Green', value: 'leafgreen' },
  { name: 'Diamond', value: 'diamond' },
  { name: 'Pearl', value: 'pearl' },
  { name: 'Platinum', value: 'platinum' },
  { name: 'Heart Gold', value: 'heartgold' },
  { name: 'Soul Silver', value: 'soulsilver' },
  { name: 'Black', value: 'black' },
  { name: 'White', value: 'white' },
  { name: 'Black 2', value: 'black-2' },
  { name: 'White 2', value: 'white-2' },
  { name: 'X', value: 'x' },
  { name: 'Y', value: 'y' },
  { name: 'Omega Ruby', value: 'omega-ruby' },
  { name: 'Alpha Sapphire', value: 'alpha-sapphire' },
  { name: "Let's Go Pikachu", value: 'lets-go-pikachu' },
  { name: "Let's Go Eevee", value: 'lets-go-eevee' },
  { name: 'Sword', value: 'sword' },
  { name: 'Shield', value: 'shield' },
]

export default function HeaderComponent() {
  const dispatch = useDispatch()

  return (
    <Box as="header" withGutter margin="0 0 2rem">
      <Box constrained align="flex-start" margin="auto" padding="2rem 0 0">
        <Link href="/">
          <Heading>PokeStats</Heading>
        </Link>
        {/** Select */}
        <SelectContainer direction="row" justify="flex-start">
          <span>Game Version:</span>
          <select onChange={(e) => dispatch(changeVersion(e.target.value))}>
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
