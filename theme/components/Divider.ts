import type { Theme } from '@mui/material';
import type { Components } from '@mui/material';

const Divider: {
  MuiDivider: Components<Theme>['MuiDivider'];
} = {
  MuiDivider: {
    defaultProps: {
      flexItem: true,
    },
    styleOverrides: {
      fullWidth: {
        width: '100%',
        borderBottomWidth: 'medium',
      },
    },
  },
};

export default Divider;
