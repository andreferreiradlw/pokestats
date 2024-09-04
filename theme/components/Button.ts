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
      root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: '1em',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'capitalize',
      },
    },
  },
};

export default Button;
