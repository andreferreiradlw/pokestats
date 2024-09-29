import type { Components, Theme } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const Table: {
  MuiTableHead: Components<Theme>['MuiTableHead'];
  MuiTableRow: Components<Theme>['MuiTableRow'];
  MuiTableCell: Components<Theme>['MuiTableCell'];
  MuiTableSortLabel: Components<Theme>['MuiTableSortLabel'];
  MuiTablePagination: Components<Theme>['MuiTablePagination'];
} = {
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
      }),
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: alpha(theme.palette.primary.light, 0.1),
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.25),
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        color: 'inherit',
      },
    },
  },
  MuiTableSortLabel: {
    defaultProps: {
      IconComponent: KeyboardArrowDown,
    },
    styleOverrides: {
      root: {
        color: 'inherit !important',
      },
      icon: {
        color: 'inherit !important',
      },
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      select: {
        width: '45px',
        textAlign: 'left',
        textAlignLast: 'left',
      },
    },
  },
};

export default Table;
