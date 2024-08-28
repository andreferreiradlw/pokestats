import { Theme, type Components } from '@mui/material';

const Grid: {
  MuiGrid2: Components<Theme>['MuiGrid2'];
} = {
  MuiGrid2: {
    styleOverrides: {
      root: {
        display: 'flex',
      },
      // container: ({ theme }) => ({
      //   gap: theme.spacing(4),
      //   alignItems: 'flex-start',
      //   justifyContent: 'flex-start',
      // }),
    },
  },
};

export default Grid;
