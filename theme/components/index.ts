import Button from './Button';
import Divider from './Divider';
import FormInputs from './FormInputs';
import Select from './Select';
import Grid from './Grid';
import Typography from './Typography';
import { ThemeOptions } from '@mui/material';

const styledMuiComponents: ThemeOptions = {
  components: {
    ...Button,
    ...Divider,
    ...Select,
    ...FormInputs,
    ...Grid,
    ...Typography,
  },
};

export default styledMuiComponents;
