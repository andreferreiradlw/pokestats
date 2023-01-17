import styled, { css } from 'styled-components';
// components
import Box from '@/components/Box';

const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const NameTH = styled.th``;
const NameTD = styled.td`
  text-transform: capitalize;
`;

const TableContainer = styled.div`
  overflow: auto;
  width: 100%;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      overflow-x: hidden;
    }
  `}
`;

const MovesTable = styled.table`
  font-size: 0.7em;
  line-height: 0.7em;
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
    padding: 0.5em;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & ${NameTH}, & ${NameTD} {
    width: 25%;
  }

  ${({ theme }) => css`
    & tr:not(:last-of-type) {
      border-bottom: 1px solid ${theme.colors.mercury};
    }

    & ${TableRow} {
      &:hover {
        background-color: ${theme.colors.mercury};
      }
    }

    @media ${theme.device.md} {
      font-size: 0.8em;
      line-height: 0.8em;
    }

    @media ${theme.device.lg} {
      font-size: 1em;
      line-height: 1em;
    }
  `}
`;

const TabContainer = styled(Box)``;

export { TableContainer, MovesTable, TableBody, NameTH, NameTD, TableRow, TabContainer };
