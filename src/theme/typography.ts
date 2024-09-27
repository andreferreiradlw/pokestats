import { JosefinSansFont, MontserratFont, QuicksandFont } from '@/components/Fonts';
import { createTheme, type ThemeOptions } from '@mui/material';
import { common } from '@mui/material/colors';

const theme = createTheme();

const customTypography: ThemeOptions = {
  typography: {
    fontFamily: MontserratFont.style.fontFamily,
    fontWeightMedium: 600,
    h1: {
      fontFamily: QuicksandFont.style.fontFamily,
      fontSize: '2.5em',
    },
    h2: {
      fontFamily: QuicksandFont.style.fontFamily,
    },
    h3: {
      fontFamily: QuicksandFont.style.fontFamily,
    },
    h4: {
      fontFamily: QuicksandFont.style.fontFamily,
    },
    h5: {
      fontFamily: QuicksandFont.style.fontFamily,
    },
    h6: {
      fontFamily: QuicksandFont.style.fontFamily,
    },
    mainHeading: {
      fontFamily: JosefinSansFont.style.fontFamily,
      fontSize: '3em',
      fontWeight: 700,
      color: common.white,
      textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
      userSelect: 'none',
      [theme.breakpoints.up('xs')]: {
        fontSize: '4.2rem',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '6em',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '7.5em',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '10em',
      },
    },
    pageHeading: {
      fontFamily: QuicksandFont.style.fontFamily,
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
      fontFamily: QuicksandFont.style.fontFamily,
      fontSize: '1.5em',
      fontWeight: 600,
      [theme.breakpoints.up('sm')]: {
        fontSize: '2em',
      },
    },
    sectionSubTitle: {
      fontFamily: QuicksandFont.style.fontFamily,
      fontSize: '1.2em',
      fontWeight: 600,
      [theme.breakpoints.up('xs')]: {
        fontSize: '1.5em',
      },
    },
    sectionMessage: {
      fontSize: '1em',
      textAlign: 'center',
      width: '100%',
    },
  },
};

export default customTypography;
