import { ThemeOptions } from '@mui/material';

const lightPalette: ThemeOptions = {
  palette: {
    primary: {
      main: '#F4C095', // peach
      // light: '#ffe7e6',
      // dark: '#513b3b',
    },
    secondary: {
      main: '#474044', // jet
      // light: '#ada9af',
      // dark: '#0f0a11',
    },
    error: {
      main: '#EE2E31', // red
    },
    divider: '#679289', // viridian
    contrastThreshold: 4.5,
    mode: 'light',
  },
};

const typeColors = {
  bug: '#A6B91A',
  dark: '#000000', // light
  dragon: '#6F35FC', // light
  electric: '#F7D02C',
  fairy: '#D685AD',
  fighting: '#C22E28', // light
  fire: '#EE8130',
  flying: '#A98FF3',
  ghost: '#735797', // light
  grass: '#7AC74C',
  ground: '#E2BF65',
  ice: '#96D9D6',
  normal: '#A8A77A',
  poison: '#A33EA1', // light
  psychic: '#F95587',
  rock: '#B6A136',
  shadow: '#000000', // light
  steel: '#B7B7CE',
  unknown: 'repeating-linear-gradient( 45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px)', // light
  water: '#6390F0',
};

const gameColors = {
  red: '#EB0000',
  blue: '#1111FF',
  yellow: '#FFD733',
};

export { lightPalette, typeColors, gameColors };
