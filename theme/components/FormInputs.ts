import { inputLabelClasses, Theme, type Components } from '@mui/material';

const FormInputs: {
  MuiFormControl: Components<Theme>['MuiFormControl'];
  MuiInputLabel: Components<Theme>['MuiInputLabel'];
  MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'];
  MuiAutocomplete: Components<Theme>['MuiAutocomplete'];
} = {
  MuiFormControl: {
    defaultProps: {
      variant: 'standard',
    },
    styleOverrides: {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5em',
      },
    },
  },
  MuiInputLabel: {
    defaultProps: {
      variant: 'standard',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.secondary.main,
        position: 'relative',
        transform: 'none',
        fontWeight: theme.typography.fontWeightMedium,
        [`&.${inputLabelClasses.focused}`]: {
          color: theme.palette.secondary.main,
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: ({ theme }) => ({
        borderColor: theme.palette.secondary.main,
        borderWidth: '2px',
      }),
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
        backgroundColor: theme.palette.background.paper,
      }),
    },
  },
};

export default FormInputs;
