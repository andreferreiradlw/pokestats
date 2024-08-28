import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Use MUI's `styled` directly for all elements
const TableBody = styled('tbody')``;

const DataCell = styled('td')``;

const NameTH = styled('th')``;

const NameTD = styled(DataCell)`
  font-weight: 500;
  text-transform: capitalize;
`;

const TableRow = styled(motion.tr)(({ theme }) => ({
  cursor: 'pointer',

  '&:hover': {
    background: theme.palette.primary.main,
  },
}));

const TableContainer = styled(motion.div)(({ theme }) => ({
  borderRadius: '5px',
  overflow: 'hidden',
  width: '100%',

  [theme.breakpoints.up('lg')]: {
    overflowX: 'hidden',
  },
}));

const MovesTableEl = styled('table')(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  fontSize: '0.7em',
  lineHeight: '0.7em',
  textAlign: 'center',
  width: '100%',

  '& thead': {
    background: theme.palette.primary.main,
  },

  '& th, & td': {
    height: '40px',
    overflow: 'hidden',
    padding: '0.5em',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  [`& ${NameTH}, & ${NameTD}`]: {
    width: '25%',
  },

  '& tr:not(:last-of-type)': {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },

  [theme.breakpoints.up('md')]: {
    fontSize: '0.8em',
    lineHeight: '0.8em',
  },

  [theme.breakpoints.up('lg')]: {
    fontSize: '1em',
    lineHeight: '1em',
  },
}));

export { TableContainer, MovesTableEl, TableBody, NameTH, DataCell, NameTD, TableRow };
