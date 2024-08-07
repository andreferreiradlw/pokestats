import { Theme, type Components } from '@mui/material';
import Chevron from 'public/static/iconLibrary/chevron.svg';

const Select: {
  MuiSelect: Components<Theme>['MuiSelect'];
} = {
  MuiSelect: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
      IconComponent: Chevron,
    },
    styleOverrides: {
      root: {
        // minWidth: '170px',
      },
      select: {
        padding: '5px 10px',
      },
      icon: {
        transition: 'transform 0.2s ease-in-out',
        width: '1.5em',
        top: 'auto',
      },
    },
  },
};

export default Select;
