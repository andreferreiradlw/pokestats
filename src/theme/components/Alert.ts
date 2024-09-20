import type { Components, Theme } from '@mui/material';

const Alert: {
  MuiAlert: Components<Theme>['MuiAlert'];
} = {
  MuiAlert: {
    styleOverrides: {
      root: {
        width: '100%',
      },
    },
  },
};

export default Alert;
