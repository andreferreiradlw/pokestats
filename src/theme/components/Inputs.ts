import { outlinedInputClasses, type Components, type Theme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Inputs: {
  MuiSelect: Components<Theme>['MuiSelect'];
  MuiTextField: Components<Theme>['MuiTextField'];
  MuiInputBase: Components<Theme>['MuiInputBase'];
} = {
  MuiSelect: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
      IconComponent: ExpandMoreIcon,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
      }),
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
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
      fullWidth: true,
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        [`& .${outlinedInputClasses.notchedOutline} legend`]: {
          display: 'none',
        },
      }),
      input: {
        padding: '5px 10px !important',
      },
    },
  },
};

export default Inputs;
