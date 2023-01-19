const breakpoints = {
  xxs: 0.1,
  xs: 24, // 375px
  sm: 33, // 528px
  md: 48, // 768px
  lg: 64, // 1024px
  xl: 90, // 1440px
  xxl: 160, // 2560px
};

const dimensions = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

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
  layout: {
    gap: '1.5em',
    gutterWidth: {
      xxs: '0 0.5em',
      md: '0 1.5em',
      lg: '0 2em',
    },
    constrained: {
      xxs: '1300px',
      xl: '1450px',
    },
  },
  colors: {
    primary: {
      main: 'white',
      light: '#dbd3d35e',
      contrastText: 'black',
    },
    secondary: {
      main: 'black',
      contrastText: 'white',
    },
    white: 'white',
    black: 'black',
    darkShadow: 'rgba(0, 0, 0, 0.3)',
    darkerShadow: 'rgba(0, 0, 0, 0.75)',
    lightShadow: 'rgba(255, 255, 255, 0.3)',
    lighterShadow: 'rgba(255, 255, 255, 0.75)',
    mercury: '#fafafa',
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
    typesHalf: {
      bug: 'rgba(166, 185, 26, 0.5)',
      dark: 'rgba(112, 87, 70, 0.5)', // light
      dragon: 'rgba(111, 53, 252, 0.5)', // light
      electric: 'rgba(247, 208, 44, 0.5)',
      fairy: 'rgba(214, 133, 173, 0.5)',
      fighting: 'rgba(194, 46, 40, 0.5)', // light
      fire: 'rgba(238, 129, 48, 0.5)',
      flying: 'rgba(169, 143, 243, 0.5)',
      ghost: 'rgba(115, 87, 151, 0.5)', // light
      grass: 'rgba(122, 199, 76, 0.5)',
      ground: 'rgba(226, 191, 101, 0.5)',
      ice: 'rgba(150, 217, 214, 0.5)',
      normal: 'rgba(168, 167, 122, 0.5)',
      poison: 'rgba(163, 62, 161, 0.5)', // light
      psychic: 'rgba(249, 85, 135, 0.5)',
      rock: 'rgba(182, 161, 54, 0.5)',
      shadow: 'rgba(0, 0, 0, 0.5)', // light
      steel: 'rgba(183, 183, 206, 0.5)',
      water: 'rgba(99, 144, 240, 0.5)',
    },
  },
};

export default theme;
export { dimensions, breakpoints };
export type ThemeType = typeof theme;
