import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import Box from '../../Box'

const TableBody = styled(motion.tbody)``
const TableRow = styled(motion.tr)``
const NameTH = styled(motion.th)``
const NameTD = styled(motion.td)``

const TableContainer = styled(motion.div)`
  overflow: auto;
  width: 100%;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      overflow-x: hidden;
    }
  `}
`

const MovesTable = styled(motion.table)`
  font-size: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
  width: 100%;

  & thead {
    background-color: black;
    color: white;
  }

  & th,
  & td {
    height: 40px;
    overflow: hidden;
    padding: 0.5rem;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  }

  ${({ theme }) => css`
    @media ${theme.device.md} {
      font-size: 0.8rem;
      line-height: 0.8rem;
    }
    @media ${theme.device.lg} {
      font-size: 1rem;
      line-height: 1rem;
    }
  `}
`

const TabContainer = styled(Box)`
  margin-bottom: 1rem;
`

export {
  TableContainer,
  MovesTable,
  TableBody,
  NameTH,
  NameTD,
  TableRow,
  TabContainer,
}
