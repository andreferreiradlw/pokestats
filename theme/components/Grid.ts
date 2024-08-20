import { Theme, type Components } from '@mui/material';

const Grid: {
  MuiGrid: Components<Theme>['MuiGrid'];
} = {
  MuiGrid: {
    styleOverrides: {
      root: {
        display: 'flex',
      },
      container: ({ theme }) => ({
        gap: theme.spacing(4),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }),
    },
  },
};

export default Grid;
