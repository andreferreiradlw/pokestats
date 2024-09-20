import { inputLabelClasses, type Components, type Theme } from '@mui/material';

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
        flexWrap: 'wrap',
      },
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
        [`&.${inputLabelClasses.focused}`]: {
          color: 'inherit',
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
        backgroundColor: theme.palette.background.default,
      }),
    },
  },
};

export default FormInputs;
