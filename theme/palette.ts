import { ThemeOptions } from '@mui/material';

const styledMuiPalette: ThemeOptions = {
  palette: {
    primary: {
      main: '#F4C095', // peach
      light: '#ffe7e6',
      dark: '#513b3b',
    },
    secondary: {
      main: '#474044', // jet
      light: '#ada9af',
      dark: '#0f0a11',
    },
    error: {
      main: '#EE2E31', // red
    },
    divider: '#679289', // viridian
    contrastThreshold: 4.5,
  },
};

export default styledMuiPalette;
