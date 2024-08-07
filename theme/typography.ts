import { createTheme, type ThemeOptions } from '@mui/material';
import { common } from '@mui/material/colors';

const theme = createTheme();

const customTypography: ThemeOptions = {
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    fontWeightMedium: 600,
    h1: {
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
      fontSize: '2.5em',
    },
    h2: {
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
    },
    h3: {
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
    },
    h4: {
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
    },
    h5: {
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
    },
    h6: {
      fontFamily: ['Quicksand', 'sans-serif'].join(','),
    },
    mainHeading: {
      fontFamily: 'Josefin Sans, sans-serif',
      fontSize: '3em',
      fontWeight: 700,
      color: common.white,
      textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
      userSelect: 'none',
    },
    pageHeading: {
      fontFamily: 'Quicksand, sans-serif',
      fontSize: '2.5em',
      fontWeight: 600,
      textAlign: 'center',
      [theme.breakpoints.up('xs')]: {
        fontSize: '3em',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '4em',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '6em',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '4.5em',
        textAlign: 'left',
      },
    },
    sectionTitle: {
      fontFamily: 'Quicksand, sans-serif',
      fontSize: '1.5em',
      fontWeight: 600,
      [theme.breakpoints.up('sm')]: {
        fontSize: '2em',
      },
    },
    sectionSubTitle: {
      fontFamily: 'Quicksand, sans-serif',
      fontSize: '1.2em',
      fontWeight: 600,
      [theme.breakpoints.up('xs')]: {
        fontSize: '1.5em',
      },
    },
  },
};

export default customTypography;
