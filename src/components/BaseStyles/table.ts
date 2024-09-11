import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Simple table styles using MUI styled
const Table = styled(motion.table)(({ theme }) => ({
  borderSpacing: 0,
  display: 'table',
  fontSize: '1em',
  lineHeight: '1.2em',
  width: '100%',
  wordBreak: 'keep-all',
  'border-collapse': 'collapse',
  tableLayout: 'fixed',

  '& tr span': {
    // fontWeight: 400,
  },

  '& tr:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.secondary.light}`,
    width: '100%',
  },

  '& th': {
    fontSize: '1em',
    fontWeight: 600,
    minHeight: '45px',
    textAlign: 'left',
    padding: '0.5em 1em 0.5em 0',
  },

  '& td': {
    fontWeight: 'normal',
    minHeight: '45px',
    padding: '0.5em 1em',
    whiteSpace: 'pre-line',

    '& p': {
      lineHeight: '1.5em',
    },
  },

  [theme.breakpoints.up('md')]: {
    whiteSpace: 'nowrap',
  },

  [theme.breakpoints.up('lg')]: {
    width: '100%',
    overflowX: 'hidden',
  },
}));

const Numbered = styled('div', {
  shouldForwardProp: prop => prop !== 'light',
})<{ light?: boolean }>(({ light }) => ({
  display: 'block',
  width: '100%',

  '& span': {
    fontWeight: 300,
  },

  '&:not(:last-of-type)': {
    paddingBottom: '6px',
  },

  ...(light && {
    fontWeight: 300,
  }),
}));

const TypesCell = styled('td')({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5em',
});

export { Table, Numbered, TypesCell };
