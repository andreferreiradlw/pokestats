import { alpha, type Theme, type Components, colors } from '@mui/material';

const Backdrop: {
  MuiBackdrop: Components<Theme>['MuiBackdrop'];
} = {
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(colors.common.black, 0.9),
      },
      invisible: {
        backgroundColor: alpha(colors.common.black, 0.1),
      },
    },
  },
};

export default Backdrop;
