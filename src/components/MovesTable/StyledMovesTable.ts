import { default as styledSC } from 'styled-components';
// components
import { css, styled } from '@mui/material';
import { motion } from 'framer-motion';

const TableBody = styledSC.tbody``;

const DataCell = styledSC.td``;

const NameTH = styledSC.th``;

const NameTD = styled(DataCell)`
  font-weight: 500;
  text-transform: capitalize;
`;

const TableRow = styled(motion.tr)(
  ({ theme }) => css`
    cursor: pointer;

    &:hover {
      background: ${theme.palette.primary.light};
    }
  `,
);

const TableContainer = styled(motion.div)(
  ({ theme }) => css`
    border-radius: 5px;
    overflow: hidden;
    width: 100%;

    ${theme.breakpoints.up('lg')} {
      overflow-x: hidden;
    }
  `,
);

const MovesTableEl = styled('table')(
  ({ theme }) => css`
    border: 2px solid ${theme.palette.primary.light};
    font-size: 0.7em;
    line-height: 0.7em;
    text-align: center;
    width: 100%;

    & thead {
      background: ${theme.palette.primary.light};
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

    & tr:not(:last-of-type) {
      border-bottom: 2px solid ${theme.palette.primary.light};
    }

    ${theme.breakpoints.up('md')} {
      font-size: 0.8em;
      line-height: 0.8em;
    }

    ${theme.breakpoints.up('lg')} {
      font-size: 1em;
      line-height: 1em;
    }
  `,
);

export { TableContainer, MovesTableEl, TableBody, NameTH, DataCell, NameTD, TableRow };
