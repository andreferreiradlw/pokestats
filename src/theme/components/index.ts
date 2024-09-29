import Accordion from './Accordion';
import Alert from './Alert';
import Backdrop from './Backdrop';
import Button from './Button';
import CssBaseline from './CssBaseline';
import Divider from './Divider';
import FormInputs from './FormInputs';
import Grid from './Grid';
import Table from './Table';
import Tooltip from './Tooltip';
import Typography from './Typography';
import type { ThemeOptions } from '@mui/material';

const styledMuiComponents: ThemeOptions = {
  components: {
    ...Accordion,
    ...Alert,
    ...Backdrop,
    ...Button,
    ...CssBaseline,
    ...Divider,
    ...FormInputs,
    ...Grid,
    ...Table,
    ...Tooltip,
    ...Typography,
  },
};

export default styledMuiComponents;
