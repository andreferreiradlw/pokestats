import { Theme, type Components } from '@mui/material';

const Select: {
  MuiSelect: Components<Theme>['MuiSelect'];
} = {
  MuiSelect: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
    styleOverrides: {
      root: {
        minWidth: '170px',
      },
    },
  },
};

export default Select;
