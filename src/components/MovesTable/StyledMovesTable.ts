import styled, { css } from 'styled-components';
// components
import { motion } from 'framer-motion';

const TableBody = styled.tbody``;

const DataCell = styled.td``;

const NameTH = styled.th``;

const NameTD = styled(DataCell)`
  font-weight: 500;
  text-transform: capitalize;
`;

const TableRow = styled(motion.tr)`
  cursor: pointer;

  ${({ theme }) => css`
    &:hover {
      background: ${theme.colors.primary.light};
      color: ${theme.colors.primary.contrastText};
    }
  `}
`;

const TableContainer = styled(motion.div)`
  border-radius: 5px;
  overflow: hidden;
  width: 100%;

  ${({ theme }) => css`
    @media ${theme.device.lg} {
      overflow-x: hidden;
    }
  `}
`;

const MovesTableEl = styled.table`
  border: 2px solid ${({ theme }) => theme.colors.primary.light};
  font-size: 0.7em;
  line-height: 0.7em;
  text-align: center;
  width: 100%;

  & thead {
    background: ${({ theme }) => theme.colors.primary.light};
    color: ${({ theme }) => theme.colors.primary.contrastText};
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
      border-bottom: 2px solid ${theme.colors.primary.light};
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

export { TableContainer, MovesTableEl, TableBody, NameTH, DataCell, NameTD, TableRow };
