import styled, { css } from 'styled-components';
// components
import { motion } from 'framer-motion';
import Box from '@/components/Box';

const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const NameTH = styled.th``;
const NameTD = styled.td`
  font-weight: 500;
  text-transform: capitalize;
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

const MovesTable = styled.table`
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
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary.light};
    }

    & ${TableRow} {
      &:hover {
        background: ${({ theme }) => theme.colors.primary.light};
        color: ${({ theme }) => theme.colors.primary.contrastText};
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

const TitleContainer = styled(Box)``;

export { TableContainer, MovesTable, TableBody, NameTH, NameTD, TableRow, TitleContainer };
