import type { Theme } from '@mui/material';
import type { Components } from '@mui/material';

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
