import styled, { css, keyframes } from 'styled-components'
import Box from '../../Box'
import { Table } from '../StyledPokemon'

const MovesTable = styled(Table)`
  & thead {
    background-color: black;
    color: white;

    & th {
      padding: 12px 6px;
    }
  }
`

const TabContainer = styled(Box)`
  margin-bottom: 1rem;
`

const Tab = styled.button`
  margin: 0.5rem;
  background: ${({ active }) => (active ? 'black' : 'none')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border: none;
  padding: 0.5rem;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus {
    outline: 1px solid black;
  }
`

const Content = styled.tbody``

export { MovesTable, TabContainer, Tab, Content }
