import type { Theme } from '@mui/material';
import type { Components } from '@mui/material';

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
