// helpers
import { mapGeneration, removeDash } from '../../../helpers'
// components
import Box from '../../Box'
// styles
import { Table } from '../../BaseStyles'

export default function TypeInfo({ info, ...rest }) {
  console.log('info', info)

  const { id, generation, move_damage_class } = info

  return (
    <Box {...rest}>
      <Table>
        <tbody>
          <tr>
            <th>Type Id</th>
            <td>{`#${id}`}</td>
          </tr>
          <tr>
            <th>Generation</th>
            <td>{mapGeneration(generation.name)}</td>
          </tr>
          <tr>
            <th>Move Damage Class</th>
            <td>{removeDash(move_damage_class.name)}</td>
          </tr>
        </tbody>
      </Table>
    </Box>
  )
}
