import { alpha, type Theme, type Components, colors } from '@mui/material';

const Backdrop: {
  MuiBackdrop: Components<Theme>['MuiBackdrop'];
} = {
  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Use white background if the theme mode is light, otherwise black
        backgroundColor:
          theme.palette.mode === 'light'
            ? alpha(colors.common.white, 0.9)
            : alpha(colors.common.black, 0.9),
      }),
      invisible: ({ theme }) => ({
        // Use a lighter color for invisible, also depending on the theme mode
        backgroundColor:
          theme.palette.mode === 'light'
            ? alpha(colors.common.white, 0.1)
            : alpha(colors.common.black, 0.1),
      }),
    },
  },
};

export default Backdrop;
