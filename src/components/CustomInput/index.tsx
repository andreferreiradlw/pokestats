import type { FormControlProps, OutlinedInputProps } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

export interface CustomInputProps extends Omit<OutlinedInputProps, 'children'> {
  label: string;
  minWidth?: string;
  formcontrolProps?: FormControlProps;
}

const CustomInput = ({
  label,
  minWidth = '165px',
  formcontrolProps,
  ...rest
}: CustomInputProps): JSX.Element => {
  return (
    <FormControl {...formcontrolProps}>
      <InputLabel id={`input-label-${label}`}>{label}</InputLabel>
      <OutlinedInput
        aria-labelledby={`input-label-${label}`}
        id={`input-text-${label}`}
        sx={{ minWidth }}
        {...rest}
      />
    </FormControl>
  );
};

export default CustomInput;
