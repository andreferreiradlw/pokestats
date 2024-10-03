// types
import type { FormikProps } from 'formik';
// helpers
import { capitalise } from '@/helpers';
// components
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  type FormControlProps,
  type SelectProps,
  type SelectChangeEvent,
  Box,
  Chip,
} from '@mui/material';

export interface CustomMultiSelectProps<T extends string | number>
  extends Omit<SelectProps<T[]>, 'children' | 'value' | 'onChange'> {
  label: string;
  options: {
    value: T;
    label: string;
  }[];
  formControlProps?: FormControlProps;
  minWidth?: string;
  name: string; // Formik field name
  formik: FormikProps<any>; // Entire Formik object
}

const CustomMultiSelect = <T extends string | number>({
  label,
  options,
  formControlProps,
  minWidth = '165px',
  name,
  formik,
  ...rest
}: CustomMultiSelectProps<T>): JSX.Element => {
  const handleChange = (event: SelectChangeEvent<T[]>) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue(
      name,
      typeof value === 'string' ? (value.split(',') as T[]) : (value as T[]),
    );
  };

  return (
    <FormControl {...formControlProps} sx={{ minWidth }}>
      <InputLabel id={`multi-select-checkbox-label-${name}`}>{label}</InputLabel>
      <Select
        labelId={`multi-select-checkbox-label-${name}`}
        id={`multi-select-checkbox-${name}`}
        multiple
        value={formik.values[name]}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 300 }}>
            {selected.map(value => (
              <Chip key={value} label={capitalise(value as string)} size="small" />
            ))}
          </Box>
        )}
        sx={{ minWidth }}
        {...rest}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={label} value={value}>
            <Checkbox checked={formik.values[name].includes(value)} />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomMultiSelect;
