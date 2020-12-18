// redux
import { useDispatch } from 'react-redux'
import { changeVersion } from './gameSlice'
// styled
import Box from '../Box'
import { Header, Container, Select } from './styledHeader'

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
]

export default function HeaderComponent() {
  const dispatch = useDispatch()

  return (
    <Header forwardedAs="header">
      <Box constrained direction="row" justify="space-between" margin="auto">
        POKESTATS
        <Select onChange={(e) => dispatch(changeVersion(e.target.value))}>
          {gameVersions.map(({ name, value }, index) => (
            <option key={index} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </Box>
    </Header>
  )
}
