import styled from 'styled-components'
// helpers
import { mapGeneration, removeDash } from '../../../helpers'
// components
import Box from '../../Box'
// styles
import { Table } from '../../BaseStyles'

const InfoTable = styled(Table)`
  width: 100%;
`

export default function TypeInfo({ info, ...rest }) {
  console.log('info', info)

  const { id, generation, move_damage_class } = info

  return (
    <Box {...rest}>
      <InfoTable>
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
      </InfoTable>
    </Box>
  )
}
