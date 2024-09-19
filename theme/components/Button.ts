import type { Theme } from '@mui/material';
import type { Components } from '@mui/material';

const Button: {
  MuiButton: Components<Theme>['MuiButton'];
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
};

export default Button;
