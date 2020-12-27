import styled, { css } from 'styled-components'
import { Table } from '../StyledPokemon'

const StatsTable = styled(Table)`
  width: 100%;
  word-break: keep-all;
`

const BarCell = styled.td`
  width: 100%;
`

export { StatsTable, BarCell }
