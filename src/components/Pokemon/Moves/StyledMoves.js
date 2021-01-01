import styled, { css, keyframes } from 'styled-components'
import Box from '../../Box'
import { Table } from '../StyledPokemon'

const TableBody = styled.tbody``
const TableRow = styled.tr``
const NameTH = styled.th``
const NameTD = styled.td``

const MovesTable = styled(Table)`
  text-align: center;

  & thead {
    background-color: black;
    color: white;
  }

  & th,
  & td {
    padding: 0.5rem;
    text-align: center;
  }

  & ${NameTH}, & ${NameTD} {
    text-align: left;
    width: 25%;
  }

  & ${TableRow} {
    background-color: white;
    color: black;

    &:hover {
      background-color: black;
      color: white;
    }

    transition: all 0.1s ease-in-out;
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
  border-radius: 4px;
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

export { MovesTable, TableBody, NameTH, NameTD, TableRow, TabContainer, Tab }
