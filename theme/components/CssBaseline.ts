import type { Theme } from '@mui/material';
import type { Components } from '@mui/material';

const CssBaseline: {
  MuiCssBaseline: Components<Theme>['MuiCssBaseline'];
} = {
  MuiCssBaseline: {
    styleOverrides: {
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
    },
  },
};

export default CssBaseline;
