import { Theme, type Components } from '@mui/material';

const Grid: {
  MuiGrid: Components<Theme>['MuiGrid'];
} = {
  MuiGrid: {
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
      },
      container: {
        gap: '1.5em',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
    },
  },
};

export default Grid;
