import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type FormControlProps,
  type SelectProps,
} from '@mui/material';

export interface DropdownProps<T extends string | number>
  extends Omit<SelectProps<T>, 'children' | 'value' | 'onChange'> {
  label: string;
  options: {
    value: T;
    label: string;
  }[];
  minWidth?: string;
  formcontrolProps?: FormControlProps;
  value: T;
  onChange?: (value: T) => void;
}

const DropdownV2 = <T extends string | number>({
  label,
  minWidth = '165px',
  options,
  formcontrolProps,
  value,
  onChange,
  ...rest
}: DropdownProps<T>): JSX.Element => (
  <FormControl {...formcontrolProps}>
    <InputLabel id={`dropdown-label-${label}`}>{label}</InputLabel>
    <Select<T>
      labelId={`dropdown-label-${label}`}
      id={`dropdown-select-${label}`}
      variant="outlined"
      value={value}
      onChange={event => onChange?.(event.target.value as T)}
      sx={{ minWidth }}
      {...rest}
    >
      {options.map(({ label, value }) => (
        <MenuItem key={label} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default DropdownV2;
