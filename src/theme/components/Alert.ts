import type { Components, Theme } from '@mui/material';

const Alert: {
  MuiAlert: Components<Theme>['MuiAlert'];
} = {
  MuiAlert: {
    styleOverrides: {
      root: {
        width: '100%',
      },
      action: {
        alignItems: 'center',
      },
      icon: {
        alignItems: 'center',
      },
    },
  },
};

export default Alert;
