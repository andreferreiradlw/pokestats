import { inputLabelClasses, Theme, type Components } from '@mui/material';

const FormInputs: {
  MuiFormControl: Components<Theme>['MuiFormControl'];
  MuiInputLabel: Components<Theme>['MuiInputLabel'];
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
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.secondary.main,
        position: 'relative',
        transform: 'none',
        [`&.${inputLabelClasses.focused}`]: {
          color: theme.palette.secondary.main,
        },
      }),
    },
  },
};

export default FormInputs;
