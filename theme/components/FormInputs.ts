import { inputLabelClasses, Theme, type Components } from '@mui/material';

const FormInputs: {
  MuiFormControl: Components<Theme>['MuiFormControl'];
  MuiInputLabel: Components<Theme>['MuiInputLabel'];
  MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'];
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
};

export default FormInputs;
