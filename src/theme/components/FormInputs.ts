import type { Components, Theme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FormInputs: {
  MuiFormControl: Components<Theme>['MuiFormControl'];
  MuiInputLabel: Components<Theme>['MuiInputLabel'];
  MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'];
  MuiSelect: Components<Theme>['MuiSelect'];
  MuiTextField: Components<Theme>['MuiTextField'];
  MuiInputBase: Components<Theme>['MuiInputBase'];
  MuiAutocomplete: Components<Theme>['MuiAutocomplete'];
} = {
  MuiFormControl: {
    defaultProps: {
      variant: 'standard',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(1),
        flexWrap: 'wrap',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
        },
      }),
    },
  },
  MuiInputLabel: {
    defaultProps: {
      variant: 'standard',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        position: 'relative',
        transform: 'none',
        fontWeight: theme.typography.fontWeightBold,
        color: 'inherit',
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: ({ theme }) => ({
        borderColor: theme.palette.secondary.main,
        borderWidth: '2px',
        top: 0,
        '& legend': {
          display: 'none',
        },
      }),
    },
  },
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
      autoComplete: 'off',
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down('md')]: {
          width: '100%',
        },
      }),
      input: {
        padding: '5px 10px !important',
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      groupLabel: ({ theme }) => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        textTransform: 'capitalize',
      }),
      paper: {
        overflow: 'hidden',
      },
      listbox: {
        padding: 0,
      },
      inputRoot: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
      }),
    },
  },
};

export default FormInputs;
