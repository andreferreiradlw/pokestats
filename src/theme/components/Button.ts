import type { Components, Theme } from '@mui/material';

const Button: {
  MuiButton: Components<Theme>['MuiButton'];
  MuiIconButton: Components<Theme>['MuiIconButton'];
} = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      disableFocusRipple: true,
      disableRipple: true,
      disableTouchRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        gap: theme.spacing(1),
        justifyContent: 'space-between',
        textTransform: 'capitalize',
      }),
    },
  },
  MuiIconButton: {
    defaultProps: {
      disableFocusRipple: true,
      // disableRipple: true,
    },
  },
};

export default Button;
