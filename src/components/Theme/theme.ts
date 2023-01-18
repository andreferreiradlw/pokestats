import { breakpoints } from '@/components/Box/config';

const theme = {
  device: {
    xxs: `(min-width: ${breakpoints.xxs}rem)`,
    xs: `(min-width: ${breakpoints.xs}rem)`,
    sm: `(min-width: ${breakpoints.sm}rem)`,
    md: `(min-width: ${breakpoints.md}rem)`,
    lg: `(min-width: ${breakpoints.lg}rem)`,
    xl: `(min-width: ${breakpoints.xl}rem)`,
    xxl: `(min-width: ${breakpoints.xxl}rem)`,
  },
  container: {
    maxWidth: '1200px',
    padding: '0 2rem',
  },
  colors: {
    white: 'white',
    black: 'black',
    darkShadow: 'rgba(0, 0, 0, 0.3)',
    darkerShadow: 'rgba(0, 0, 0, 0.75)',
    lightShadow: 'rgba(255, 255, 255, 0.3)',
    lighterShadow: 'rgba(255, 255, 255, 0.75)',
    mercury: '#e6e6e6',
    types: {
      bug: '#A6B91A',
      dark: '#705746', // light
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
      unknown:
        'repeating-linear-gradient( 45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px)', // light
      water: '#6390F0',
    },
  },
};

export default theme;
export type ThemeType = typeof theme;
