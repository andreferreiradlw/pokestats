import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import Box from '../../Box'

const TableBody = styled(motion.tbody)``
const TableRow = styled(motion.tr)``
const NameTH = styled(motion.th)``
const NameTD = styled(motion.td)``

const TableContainer = styled(motion.div)`
  width: 100%;
  overflow-y: auto;
  overflow: auto;
`

const MovesTable = styled(motion.table)`
  width: 100%;
  text-align: center;
  font-size: 0.7rem;
  line-height: 0.7rem;

  & thead {
    background-color: black;
    color: white;
  }

  & th,
  & td {
    padding: 0.5rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 40px;
  }

  & ${NameTH}, & ${NameTD} {
    text-align: left;
    width: 25%;
  }

  & tr:not(:last-of-type) {
    border-bottom: 1px solid #ececec;
  }

  & ${TableRow} {
    &:hover {
      background-color: #ececec;
    }

    // transition: all 0.1s ease-in-out;
  }

  ${({ theme }) => css`
    @media ${theme.device.md} {
      font-size: 0.8rem;
      line-height: 0.8rem;
    }
  `}

  ${({ theme }) => css`
    @media ${theme.device.md} {
      font-size: 1rem;
      line-height: 1rem;
    }
  `}
`

const TabContainer = styled(Box)`
  margin-bottom: 1rem;
`

const Tab = styled(motion.button)`
  margin: 0.5rem;
  background: ${({ active }) => (active ? 'black' : 'none')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  // transition: all 0.3s ease-in-out;

  &:hover,
  &:focus {
    outline: 1px solid black;
  }
`

export {
  TableContainer,
  MovesTable,
  TableBody,
  NameTH,
  NameTD,
  TableRow,
  TabContainer,
  Tab,
}
