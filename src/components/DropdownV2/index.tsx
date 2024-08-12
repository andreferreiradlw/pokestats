import {
  FormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

export interface DropdownProps extends SelectProps<string> {
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
