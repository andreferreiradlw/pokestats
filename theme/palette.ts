import { ThemeOptions } from '@mui/material';

const styledMuiPalette: ThemeOptions = {
  palette: {
    primary: {
      main: '#F4C095', // peach
      light: '#ffe7e6',
      dark: '#513b3b',
    },
    secondary: {
      main: '#071E22', // rich black
      light: '#0f0a11',
      dark: '#ada9af',
    },
    error: {
      main: '#EE2E31', // red
    },
    divider: '#679289', // viridian
    contrastThreshold: 4.5,
  },
};

export default styledMuiPalette;
