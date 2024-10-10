import type { ThemeOptions } from '@mui/material';

const lightPalette: ThemeOptions = {
  palette: {
    primary: {
      main: '#8C6A54', // richer warm pastel peach to improve contrast
    },
    secondary: {
      main: '#9A8587', // slightly darker mauve for better contrast
    },
    background: {
      default: '#F4F1EF', // light warm grey, slightly toned down for better text contrast
      paper: '#FFFFFF', // white for optimal readability on paper surfaces
    },
    text: {
      primary: '#2C2A29', // dark charcoal for strong readability
      secondary: '#4B4848', // muted dark grey, with improved contrast
    },
    error: {
      main: '#E53935', // deeper red for more visibility and contrast in errors
    },
    divider: '#B8B3B3', // soft yet slightly darker muted grey for improved contrast
    contrastThreshold: 4.5, // ensuring readability across elements
    mode: 'light',
  },
};

const darkPalette: ThemeOptions = {
  palette: {
    primary: {
      main: '#D29F7E', // soft peach (muted version of light primary)
    },
    secondary: {
      main: '#7A7175', // muted mauve (similar to jet but slightly lighter)
    },
    background: {
      default: '#2E2A2C', // dark charcoal
      paper: '#3C383A', // slightly lighter charcoal
    },
    text: {
      primary: '#F1EDEE', // light grey (to contrast with dark background)
      secondary: '#D4CFCF', // softer grey for secondary text
    },
    error: {
      main: '#FF6B6B', // bright red for error to stand out
    },
    divider: '#4A7070', // muted viridian
    contrastThreshold: 4.5,
    mode: 'dark',
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
  red: '#EB0000', // Red
  blue: '#1111FF', // Blue
  yellow: '#FFD733', // Yellow
  gold: '#DAA520', // Gold
  silver: '#C0C0C0', // Silver
  crystal: '#4FD0E1', // Crystal
  ruby: '#A30C20', // Ruby
  sapphire: '#1359AE', // Sapphire
  emerald: '#00C78C', // Emerald
  firered: '#FF732B', // FireRed
  leafgreen: '#58C147', // LeafGreen
  diamond: '#7F8FAB', // Diamond
  pearl: '#E1C0D9', // Pearl
  platinum: '#A7A7A7', // Platinum
  heartgold: '#D1B055', // HeartGold
  soulsilver: '#BCC5CE', // SoulSilver
  black: '#333333', // Black
  white: '#F0F0F0', // White
  'black-2': '#5A5A5A', // Black 2
  'white-2': '#EDEDED', // White 2
  x: '#637CDC', // X
  y: '#D83A68', // Y
  'omega-ruby': '#D14E38', // Omega Ruby
  'alpha-sapphire': '#2582E0', // Alpha Sapphire
  sun: '#F1912B', // Sun
  moon: '#5599CA', // Moon
  'ultra-sun': '#FF994D', // Ultra Sun
  'ultra-moon': '#28599A', // Ultra Moon
  'lets-go-pikachu': '#F8D030', // Let's Go Pikachu
  'lets-go-eevee': '#C58C3B', // Let's Go Eevee
  sword: '#5C93D4', // Sword
  shield: '#D9425E', // Shield
  'legends-arceus': '#B3B8C0', // Legends Arceus
  scarlet: '#FF5B58', // Scarlet
  violet: '#AF62E6', // Violet
};

export { lightPalette, darkPalette, typeColors, gameColors };
