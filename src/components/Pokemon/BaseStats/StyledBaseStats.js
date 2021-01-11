import styled from 'styled-components'
import { Table } from '../../BaseStyles'

const StatsTable = styled(Table)`
  width: 100%;
  word-break: keep-all;
`

const BarCell = styled.td`
  width: 100%;
`

export { StatsTable, BarCell }
