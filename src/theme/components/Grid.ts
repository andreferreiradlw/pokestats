import type { Components, Theme } from '@mui/material';

const Grid: {
  MuiGrid2: Components<Theme>['MuiGrid2'];
} = {
  MuiGrid2: {
    styleOverrides: {
      root: {
        display: 'flex',
      },
    },
  },
};

export default Grid;
