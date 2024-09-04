import type { FormControlProps, SelectProps } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export interface DropdownProps extends Omit<SelectProps<string>, 'children'> {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  minWidth?: string;
  formcontrolProps?: FormControlProps;
}

const DropdownV2 = ({
  label,
  minWidth = '165px',
  options,
  formcontrolProps,
  ...rest
}: DropdownProps): JSX.Element => {
  return (
    <FormControl {...formcontrolProps}>
      <InputLabel id={`dropdown-label-${label}`}>{label}</InputLabel>
      <Select
        labelId={`dropdown-label-${label}`}
        id={`dropdown-select-${label}`}
        variant="outlined"
        sx={{ minWidth }}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownV2;
