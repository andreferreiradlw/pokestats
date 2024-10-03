import type { FormikProps } from 'formik';
import {
  FormControl,
  InputLabel,
  Slider,
  Box,
  type FormControlProps,
  type SliderProps,
} from '@mui/material';

export interface CustomSliderProps extends Omit<SliderProps, 'value' | 'onChange'> {
  label: string;
  name: string; // Formik field name
  formik: FormikProps<any>; // Entire Formik object
  formControlProps?: FormControlProps;
  maxWidth?: string | number;
}

const CustomSlider = ({
  label,
  name,
  formik,
  formControlProps,
  maxWidth = '300px',
  valueLabelDisplay = 'auto',
  ...rest
}: CustomSliderProps): JSX.Element => {
  const handleChange = (_: Event, newValue: number | number[]) => {
    formik.setFieldValue(name, newValue);
  };

  return (
    <FormControl sx={{ gap: { xxs: 1, md: 3 } }} {...formControlProps}>
      <InputLabel>{label}</InputLabel>
      <Box sx={{ maxWidth: { xxs: '100%', md: maxWidth }, width: { xxs: '100%', md: maxWidth } }}>
        <Slider
          value={formik.values[name]}
          onChange={handleChange}
          valueLabelDisplay={valueLabelDisplay}
          {...rest}
        />
      </Box>
    </FormControl>
  );
};

export default CustomSlider;
