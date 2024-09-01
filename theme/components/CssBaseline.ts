import { Theme, type Components } from '@mui/material';

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
